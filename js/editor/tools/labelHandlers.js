import { clickHandler } from "./click/clickHandler.js";
import { addCursor } from "../utils/mouse/cursor/customCursor.js";
import { toogleDropdown } from "../utils/dropdown/dropdown.js";
import { eraseHandler } from "./eraser/eraser.js"
import { groupHandler } from "./group/groupHandler.js";

export const labelHandlers = () => {
  const labelsDom = document.querySelectorAll(".labels");
  labelsDom.forEach((labelDom) => {
    labelDom.addEventListener("click", (e) => {
      //get Label ID
      let labelId;
      if (e.target.id) {
        labelId = e.target.id;
      } else {
        labelId = e.target.parentNode.id;
      }
      const label = labelId.replace("_label", "");
      // call handler
      switch (label) {
        case "question":
        case "result":
          // change cursor
          document.querySelector("#wrapper").style.cursor = "pointer";
          // add custom cursor
          addCursor(labelId);
          clickHandler(label);
          break;
        case "answer":
          toogleDropdown(label);
          break;
        case "answer_text":
        case "answer_img":
        case "answer_list":
          toogleDropdown('answer');
          // change cursor
          document.querySelector("#wrapper").style.cursor = "pointer";
          // add custom cursor
          addCursor(labelId);
          clickHandler(label);
          break;
        case "eraser":
          // change cursor
          document.querySelector("#wrapper").style.cursor = "pointer";
          // add custom cursor
          addCursor(labelId);
          eraseHandler();
          break;
        case "group":
          document.querySelector("#wrapper").style.cursor = "crosshair";
          groupHandler();
          break;
        case "upload":
          toogleDropdown(label);
          //user_upload();
          break;
        case "download":
          toogleDropdown(label);
          //user_download();
          break;
        default:
          console.log("labelHandlers failed");
          break;
      }
    });
  });
};
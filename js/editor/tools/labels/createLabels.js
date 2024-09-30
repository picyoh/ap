import { resetHandlers } from "../../grid/gridHandler.js";
import { clickHandler } from "../clickHandler/clickHandler.js";
import { addCursor } from "../cursor/customCursor.js";
import { toogleDropdown } from "../dropdown/dropdown.js";

export const createLabels = (labels) => {
  let labelHtml = "";
  labels.forEach((label) => {
    if (label.name === "hr") {
      const hr = `<hr class='separator' />`;
      labelHtml += hr;
    } else {
      const labelTemplate = `
                    <div id='${label.name}_label' class='labels${
        label.menu ? " z_border" : ""
      }'>
                      <i class="${label.icon}"></i>
                      <p>${label.text}</p>
                      ${label.menu ? createMenu(label) : ""}
                    </div>
                    `;
      labelHtml += labelTemplate;
    }
  });
  const tools = document.querySelector("#tools");
  tools.insertAdjacentHTML("afterbegin", labelHtml);
  resetHandlers();
  callHandlers();
};

const createMenu = (label) => {
  let container = "";
  let content = "";
  label.menu.forEach((topic) => {
    if (topic.name === "file") {
      content = `
      <label for'${label.name}_${topic.name}'>Fichier:&nbsp</label>
      <input type='file' id='${label.name}_${topic.name}' name='${label.name}_${topic.name}' accept='application.json' />
      `;
    } else {
      content = `<i class="${topic.icon}"></i>`;
    }
    container += `<div id='${label.name}_${topic.name}_label' class='menu_labels'>${content}</div>`;
  });
  return `<div id='${label.name}_menu' class='menus drop-down'>${container}</div>`;
};

export const callHandlers = () => {
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
        case "eraser":
          // change cursor
          document.querySelector("#wrapper").style.cursor = "pointer";
          // add custom cursor
          addCursor(labelId);
          //eraseHandler();
          break;
        case "group":
          // change cursor
          document.querySelector("#wrapper").style.cursor = "pointer";
          // add custom cursor
          addCursor(labelId);
          areaHandler(label);
        case "upload":
          toogleDropdown(label);
          user_upload();
          break;
        case "download":
          toogleDropdown(label);
          //user_download();
          break;
        default:
          console.log("callHandlers failed");
          break;
      }
    });
  });
};

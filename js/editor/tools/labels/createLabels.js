import { resetHandlers } from "../../grid/gridHandler.js";
import { clickHandler } from "../clickHandler/clickHandler.js";
import { addCursor } from "../cursor/customCursor.js";

export const createLabels = (labels) => {
  let labelHtml = "";
  labels.forEach((label) => {
    if (label.name === "hr") {
      const hr = `<hr class='separator' />`;
      labelHtml += hr;
    } else {
      const labelTemplate = `
                    <div id='${label.name}_label' class='labels ${label.menu ? 'z_border': ''}'>
                      <p>${label.text}</p>
                      <i class="${label.icon}"></i>
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
      console.log(topic.name);
      content = `
      <label for'${label.name}_${topic.name}'>Fichier:&nbsp</label>
      <input type='file' id='${label.name}_${topic.name}' name='${label.name}_${topic.name}' accept='application.json' />
      `;
    } else {
      content = `<i class="${topic.icon}"></i>`;
    }
    container += `<div id='${label.name}_${topic.name}_label' class='menu_labels'>${content}</div>`;
  });
  return `<div id='${label.name}_menu' class='menus'>${container}</div>`;
};

export const callHandlers = () => {
  const labelsDom = document.querySelectorAll(".labels");
  labelsDom.forEach((labelDom) => {
    labelDom.addEventListener("click", (e) => {
      // change cursor
      document.querySelector("#wrapper").style.cursor = "pointer";
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
        case "answer":
        case "result":
          addCursor(labelId);
          clickHandler(label);
          break;
        case "eraser":
          // add cursor
          addCursor(labelId);
          //eraseHandler();
          break;
        case "row":
        case "links":
          areaHandler(label);
        case "import":
          user_import();
          break;
        case "export":
          user_export();
          break;
        default:
          console.log("callHandlers failed");
          break;
      }
    });
  });
};

import { resetHandlers } from "../../grid/gridHandler.js";
import { clickHandler } from "../clickHandler/clickHandler.js";

export const createLabels = (labels) => {
  let labelHtml = "";
  labels.forEach((label) => {
    if (label.name === "hr") {
      const hr = `<hr class='separator' />`;
      labelHtml += hr;
    } else {
      const labelTemplate = `
                    <div id='${label.name}Label' class='labels'>
                      <i class="fa-solid fa-${label.icon}"></i>
                      <p>${label.text}</p>
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

export const callHandlers = () => {
  const labelsDom = document.querySelectorAll(".labels");
  labelsDom.forEach((labelDom) => {
    labelDom.addEventListener("click", (e) => {
      // change cursor

      //get Label ID
      let labelId;
      if (e.target.id) {
        labelId = e.target.id;
      } else {
        labelId = e.target.parentNode.id;
      }
      const label = labelId.replace("Label", "");
      // call handler
      switch (label) {
        case "question":
        case "answer":
        case "result":
          clickHandler(label);
          break;
        case "eraser":
          eraseHandler();
          break;
        case "row":
        case "links":
          areaHandler(label)
        case "import":
          user_import();
          break;
        case "export":
          user_export();
          break;
        default:
          break;
      }
    });
  });
};

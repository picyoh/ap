import { createMenu } from "./createMenu.js";
import { resetHandlers } from "../../grid/gridHandler.js";
import { labelHandlers } from "./labelHandlers.js";

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
      } tooltip'>
                      <p class='tooltip_text'>${label.text}</p>
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
  labelHandlers();
};


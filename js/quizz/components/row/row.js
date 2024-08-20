import { addContainer } from "../container/container.js";

export const addRow = (newRow) => {
  // get values for draggables
  const row = `
      <div class='row'>
          <div class='row__content' id='row_${newRow}' data-drop-target='true'></div>
          <div class='row__answers' data-drop-target="true"></div>
          <button type='button' class='add_row' id='${newRow}'>+</button>
      </div>
      `;
  const form = document.querySelector("#rows");
  form.insertAdjacentHTML("beforeend", row);
  const containers = form.querySelectorAll(".row__content");
  const container = containers[containers.length - 1];
  addContainer(container);
};

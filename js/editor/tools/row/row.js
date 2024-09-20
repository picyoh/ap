import { addContainer } from "../../../editor/tools/container/container.js";

export const addRow = (newRow) => {
  // get values for draggables
  const row = `
      <div class='row'>
        <div class="row__label" id="row_label_${newRow}">
          <label for='row_name_${newRow}' class="row_name_label">Row name</label>
          <input type='text' id='row_name_${newRow}' name='row_name_${newRow}' class='row_name' placeholder='Theme'/>
        </div>
        <div class='row__content' id='row_${newRow}' data-drop-target='true'></div>
      </div>
      `;
  const rowBtn = document.querySelector(".add_row");
  rowBtn.insertAdjacentHTML("beforebegin", row);
  const form = document.querySelector("#rows");
  const containers = form.querySelectorAll(".row__content");
  const container = containers[containers.length - 1];
  addContainer(container);
};

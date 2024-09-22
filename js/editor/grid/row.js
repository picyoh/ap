import { getGridStyle } from "./gridUtils.js";
import { createNewTemplateLine } from "./gridUtils.js";
import { addEmptyContainers } from "./emptyContainers.js";

export const addRowHandler = () => {
  const addRowBtn = document.querySelector("#add_row");
  addRowBtn.addEventListener("click", (e) => {
    addRow();
  });
};

const addRow = () => {
  // get style declaration infos
  const style = getGridStyle();
  // get new template line & add new row to grid template
  style.splitted.splice(
    style.rowCount,
    0,
    createNewTemplateLine(style.colCount)
  );
  // concat
  const newGridTemplate = `"${style.splitted.join('" "')}"`;
  // set property
  style.wrapper.setProperty("grid-template-areas", newGridTemplate);
  // add containers
  addEmptyContainers(style.totalCont, style.colCount);
};

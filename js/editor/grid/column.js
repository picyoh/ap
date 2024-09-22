import { getGridStyle } from "./gridUtils.js";
import { createNewTemplateLine } from "./gridUtils.js";
import { addEmptyContainers } from "./emptyContainers.js";

export const addColumnHandler = () => {
  const addColumnBtn = document.querySelector("#add_column");
  addColumnBtn.addEventListener("click", (e) => {
    addColumn();
  });
};

const addColumn = () => {
  const style = getGridStyle();

  const newLineTemp = `"${createNewTemplateLine(style.colCount + 1)}" `;
  const rowBtnStr = `rowBtn `;
  const newGridTemplate = `${newLineTemp.repeat(
    style.rowCount
  )} "${rowBtnStr.repeat(style.colCount + 1)}."`;
  //console.log(newGridTemplate);
  style.wrapper.setProperty("grid-template-areas", newGridTemplate);
  style.wrapper.setProperty(
    "grid-template-columns",
    `repeat(${style.colCount + 1}, 1fr)`
  );
  addEmptyContainers(style.totalCont, style.rowCount);
};

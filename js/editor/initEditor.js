import { initSvg } from "./svg/paths/components/svg.js";
import { addEmptyContainers } from "./form/container/emptyContainers.js";
import { submitHandlerQuizz } from "./form/submit/submitHandlers.js";

//TODO: deplacer resultats dans tools
//TODO: deplacer tags
//TODO: deplacer hidelinks dans tools
//TODO: handler bouton add row et add container;
//TODO: submit editor a mettre en place

export const initEditorForm = () => {
  const form = `
    <form id='editor'>
    </form>
    `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", form);
  initWrapper();
  initSvg();
  //initSubmit();
};

const initWrapper = () => {
  const rows = `
       <div id='wrapper' class='grid_wrapper'>
        <button type='button' id='add_column'>+</button>
        <button type='button' id='add_row'>+</button>
       </div>
       `;
  const form = document.querySelector("#editor");
  form.insertAdjacentHTML("beforeend", rows);
  //initWrapperStyle();
  addEmptyContainers(-1, 25);
  initTools();
  addRowHandler();
  addColumnHandler();
};

const initTools = () => {
  const tools = `
  <div id='tools'></div>
  `;
  const wrapper = document.querySelector("#editor");
  wrapper.insertAdjacentHTML("afterbegin", tools);
};

const addRowHandler = () => {
  const addRowBtn = document.querySelector("#add_row");
  addRowBtn.addEventListener("click", (e) => {
    addRow();
  });
};

const addRow = () => {
  //getStyleDeclaration()
  // get wrapper style declaration
  const wrapperStyleDeclaration = document.styleSheets[0].cssRules[0].style;
  // get current grid template
  const currentGridTemp = wrapperStyleDeclaration.gridTemplateAreas;
  // split
  const splitted = currentGridTemp.split('"').filter((e) => e && e !== " ");
  // get row and column numbers
  const rowCount = parseInt(splitted.length - 1);
  const colCount = parseInt(splitted[0].split(" ").length - 1);
  // calc the number of container to add
  const contCount = parseInt(rowCount * colCount - 1);
  // get new template line & add new row to grid template
  splitted.splice(rowCount, 0, createNewTemplateLine(colCount));
  // concat
  const newGridTemplate = `"${splitted.join('" "')}"`;
  // set property
  wrapperStyleDeclaration.setProperty("grid-template-areas", newGridTemplate);
  // add containers
  console.log(rowCount, colCount, contCount);
  addEmptyContainers(contCount, colCount);
  //console.log('currentGrid : ' + currentGridTemp);
  //console.log('newvalue : ' + newValue);
  //console.log(splitted, rowLength * rowCount, rowLength);
};

const addColumnHandler = () => {
  const addColumnBtn = document.querySelector("#add_column");
  addColumnBtn.addEventListener("click", (e) => {
    addColumn();
  });
};
// TODO: reformater pour creer un objet dans getStyleDec
const addColumn = () => {
  // getStyleDeclaration()
  // get wrapper style declaration
  const wrapperStyleDeclaration = document.styleSheets[0].cssRules[0].style;
  // get current grid template
  const currentGridTemp = wrapperStyleDeclaration.gridTemplateAreas;
  // get current griu
  // split
  const splitted = currentGridTemp.split('"').filter((e) => e && e !== " ");
  // get row and column numbers
  const rowCount = parseInt(splitted.length - 1);
  const colCount = parseInt(splitted[0].split(" ").length - 1);
  // calc the number of container to add
  const contCount = parseInt(rowCount * colCount - 1);

  const newLineTemp = `"${createNewTemplateLine(colCount + 1)}" `;
  const rowBtnStr = `rowBtn `;
  const newGridTemplate = `${newLineTemp.repeat(rowCount)} "${rowBtnStr.repeat(
    colCount + 1
  )}."`;
  //console.log(newGridTemplate);
  wrapperStyleDeclaration.setProperty("grid-template-areas", newGridTemplate);
  wrapperStyleDeclaration.setProperty("grid-template-columns", `repeat(${colCount + 1}, 1fr)`);
  addEmptyContainers(contCount, rowCount);
};

const getStyleDeclaration = () => {
  // get container
  const wrapper = document.querySelector("#wrapper");
  // get wrapper style
  const wrapperStyleDeclaration = document.styleSheets[0].cssRules[0].style;
  // get current grid template
  const currentGridTemp = wrapperStyleDeclaration.gridTemplateAreas;
  // split
  const splitted = currentGridTemp.split('"').filter((e) => e && e !== " ");
  // get row and column numbers
  const rowCount = parseInt(splitted.length - 1);
  const colCount = parseInt(splitted[0].split(" ").length - 1);
};

const createNewTemplateLine = (colCount) => {
  const compar = "compar ";
  return `${compar.repeat(colCount)}contBtn`;
};

const initSubmit = () => {
  const button = `
        <button id='submit'>Submit</button>
        `;
  const form = document.querySelector("#editor");
  form.insertAdjacentHTML("beforeend", button);
  submitHandlerQuizz();
};

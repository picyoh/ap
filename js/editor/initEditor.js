import { initSvg } from "./svg/paths/components/svg.js";
import { addEmptyContainers } from "./grid/emptyContainers.js";
import { submitHandlerQuizz } from "./form/submit/submitHandlers.js";
import { addRowHandler } from "./grid/row.js"
import { addColumnHandler } from "./grid/column.js"
import { createLabels } from "./tools/createLabels.js"
import { addZoomIcons } from "./tools/zoom/zoomIcons.js";


//TODO: deplacer resultats dans tools
//TODO: deplacer tags
//TODO: deplacer hidelinks dans tools
//TODO: handler bouton add row et add container;
//TODO: submit editor a mettre en place
//TODO: rendre la fenetre editor navigable

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
  addEmptyContainers(-1, 63);
  initTools();
  addRowHandler();
  addColumnHandler();
};

const initTools = () => {
  addZoomIcons();
  const tools = `
  <div id='tools'></div>
  `;
  const wrapper = document.querySelector("#editor");
  wrapper.insertAdjacentHTML("afterbegin", tools);
  const labels = [
    {name:"question", text:"Question", icon:'bars'},
    {name:"answer", text:"Réponse", icon:'grip-lines'},
    {name:"row", text:"Thème", icon:'object-group'},
    {name:"links", text:"Liens", icon:'diagram-project'},
    {name:"result", text:"Résultat", icon:'link'},
    {name:"eraser", text:"Gomme", icon:'eraser'},
    {name:"upload", text:"Importer", icon:'file-import'},
    {name:"submit", text:"Télécharger", icon:'file-export'},
  ];
  createLabels(labels);
};

const initSubmit = () => {
  const button = `
  <button id='submit'>Submit</button>
  `;
  const form = document.querySelector("#editor");
  form.insertAdjacentHTML("beforeend", button);
  submitHandlerQuizz();
};

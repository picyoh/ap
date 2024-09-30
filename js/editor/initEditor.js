import { initSvg } from "./svg/paths/components/svg.js";
import { createLabels } from "./tools/labels/createLabels.js"
import { addZoomIcons } from "./grid/zoom/zoomIcons.js";
import { initHandlers } from "./grid/gridHandler.js";

//TODO: templates => composants

//TODO: ameliorer navigation (callstack et reinit a verif);
//TODO: add grip and link on .containers and .answer
//TODO: add answer feature (only add on existant container else change cursor to 0)
//TODO: dropdown on click / answer => txt, img or list
//TODO: add result feature 
//TODO: add link feature
//TODO: set drag and drop 
//TODO: add group and select feature
//TODO: add import and export feature
//TODO: complexifier grille css
//TODO: faire apparaitre une box de tags au premier result ajoute
//TODO: submit editor a mettre en place
//TODO: fusionner les fichiers question et result + ajouter nuage de tag au milieu du json

export const initEditorForm = () => {
  const form = `
  <form id="editor">
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
  <div id="wrapper" style="cursor: grab;">
  </div>
  `;
  const form = document.querySelector("#editor");
  form.insertAdjacentHTML("beforeend", rows);
  initTools();
};

const initTools = () => {
  const tools = `
  <div id="tools"></div>
  `;
  const wrapper = document.querySelector("#editor");
  wrapper.insertAdjacentHTML("afterbegin", tools);
  const labels = [
    {name:"question", text:"Question", icon:"fi fi-rr-comments-question-check"},
    {name:"answer", text:"Réponse", icon:"fi fi-rr-comment-check", menu:[{name:'text', icon:'fi fi-rr-text'},{name:'img', icon:'fi fi-rr-picture'} , {name:'list', icon:'fi fi-rr-list-dropdown'}]},
    {name:"result", text:"Résultat", icon:"fi fi-rr-leaderboard"},
    {name:"eraser", text:"Gomme", icon:"fi fi-rr-eraser"},
    {name: "hr"},
    {name:"select", text:"Selection", icon:"fi fi-rr-square-dashed"},
    {name:"group", text:"Creer un groupe", icon:"fi fi-rr-object-group"},
    {name: "hr"},
    {name:"upload", text:"Importer", icon:"fi fi-rr-file-import", menu:[{name: 'file'}]},
    {name:"submit", text:"Télécharger", icon:"fi fi-rr-file-export", menu:[{name: 'file'}]}
  ];
  addZoomIcons();
  createLabels(labels);
  initHandlers()
};

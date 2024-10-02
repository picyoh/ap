import { initSvg } from "./svg/paths/components/svg.js";
import { createLabels } from "./tools/labels/createLabels.js"
import { addZoomIcons } from "./grid/zoom/zoomIcons.js";
import { initHandlers } from "./grid/gridHandler.js";

//TODO: templates => composants

//TODO: ameliorer navigation (callstack et reinit a verif);
//TODO: add grip and link on .containers and .answer
//TODO: tooltip css rather than p in labels
//TODO: add result feature 
//TODO: add init question
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
    {name:"question", text:"Question", icon:"fi fi-rr-comment-question"},
    {name:"answer", text:"Réponse", icon:"fi fi-rr-comment-check", menu:[{name:'text', icon:'fi fi-rr-text'},{name:'img', icon:'fi fi-rr-picture'} , {name:'list', icon:'fi fi-rr-list'}]},
    {name:"result", text:"Résultat", icon:"fi fi-rr-ranking-star"},
    {name: "hr"},
    {name:"group", text:"Creer un groupe", icon:"fi fi-rr-object-group"},
    {name:"eraser", text:"Gomme", icon:"fi fi-rr-eraser"},
    {name: "hr"},
    {name:"upload", text:"Importer", icon:"fi fi-rr-upload", menu:[{name: 'file'}]},
    {name:"download", text:"Télécharger", icon:"fi fi-rr-download", menu:[{name: 'file'}]}
  ];
  addZoomIcons();
  createLabels(labels);
  initHandlers()
};

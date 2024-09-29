import { initSvg } from "./svg/paths/components/svg.js";
import { createLabels } from "./tools/labels/createLabels.js"
import { addZoomIcons } from "./grid/zoom/zoomIcons.js";
import { initHandlers } from "./grid/gridHandler.js";

//TODO: templates => composants

//TODO: reprendre au questions en placant au px
//TODO: rendre la fenetre editor navigable
//TODO: faire apparaitre une box de tags au premier result ajouter
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
    {name:"question", text:"Question", icon:"bars"},
    {name:"answer", text:"Réponse", icon:"grip-lines"},
    {name:"result", text:"Résultat", icon:"link"},
    {name:"eraser", text:"Gomme", icon:"eraser"},
    {name: "hr"},
    {name:"row", text:"Thème", icon:"object-group"},
    {name:"links", text:"Liens", icon:"diagram-project"},
    {name: "hr"},
    {name:"upload", text:"Importer", icon:"file-import"},
    {name:"submit", text:"Télécharger", icon:"file-export"}
  ];
  addZoomIcons();
  createLabels(labels);
  initHandlers()
};

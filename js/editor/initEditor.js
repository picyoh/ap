import { initSvg } from "./svg/paths/components/svg.js";
import { addEmptyContainers } from "./grid/emptyContainers.js";
import { createLabels } from "./tools/labels/createLabels.js"
import { addZoomIcons } from "./tools/zoom/zoomIcons.js";

import { initHandlers } from "./resetHandlers.js";

//TODO: templates => composants

//TODO: deplacer resultats dans tools
//TODO: deplacer tags
//TODO: deplacer hidelinks dans tools
//TODO: handler bouton add row et add container;
//TODO: submit editor a mettre en place
//TODO: rendre la fenetre editor navigable
//TODO: virer grille pour valeurs fixes
//TODO: voir cb de px pour un bloc question
//TODO: check navigation
//TODO: fusionner les fichiers question et result + ajouter nuage de tag au milieu;
//TODO: Enlever les scroll de #editor via css

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
  <div id='wrapper' class='grid_wrapper' style='cursor: grab;'>
  </div>
  `;
  const form = document.querySelector("#editor");
  form.insertAdjacentHTML("beforeend", rows);
  //initWrapperStyle();
  addEmptyContainers(0, 20, 20);
  addGridBtn()
  initTools();
};

const addGridBtn = () =>{
  const rowBtn = `<button type='button' id='add_row'>+</button><div class="bottomRight"></div>`;
  const wrapper = document.querySelector('#wrapper');
  wrapper.insertAdjacentHTML('beforeend', rowBtn);

  const colBtn = `<button type='button' id='add_column'>+</button>`;
  const rows = document.querySelector('.rows');
  rows.insertAdjacentHTML('beforeend', colBtn)
}

const initTools = () => {
  const tools = `
  <div id='tools'></div>
  `;
  const wrapper = document.querySelector("#editor");
  wrapper.insertAdjacentHTML("afterbegin", tools);
  const labels = [
    {name:"question", text:"Question", icon:'bars'},
    {name:"answer", text:"Réponse", icon:'grip-lines'},
    {name:"result", text:"Résultat", icon:'link'},
    {name:"row", text:"Thème", icon:'object-group'},
    {name:"links", text:"Liens", icon:'diagram-project'},
    {name:"upload", text:"Importer", icon:'file-import'},
    {name:"submit", text:"Télécharger", icon:'file-export'},
    {name:"eraser", text:"Gomme", icon:'eraser'}
  ];
  addZoomIcons();
  createLabels(labels);
  initHandlers()
};

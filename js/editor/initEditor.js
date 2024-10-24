import { initSvg } from "./svg/svg.js";
import { createLabels } from "./tools/labels/createLabels.js"
import { addZoomIcons } from "./grid/zoom/zoomIcons.js";
import { initHandlers } from "./handlers.js";
import { importExemple } from "./tools/import/customImport.js";

//TODO: templates => composants

//TODO: improve example img->supp list->choix + result pizzeria
//TODO: merge question and result datas
//TODO: add export feature
//TODO: add colorpicker
//TODO: add position screen above zoom
//TODO: complex css grid
//TODO: adjust image on drag
//TODO: ameliorer navigation (callstack et reinit a verif);
//TODO: changer image preview

export const initEditorForm = () => {
  const form = `
  <form id="editor">
  </form>
  `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", form);
  initWrapper();
  //initSubmit();
};

const initWrapper = () => {
  const rows = `
  <div id="wrapper" style="cursor: grab;">
  </div>
  `;
  const content = `<div id="container_0" class="containers question_container" draggable="true" style="top: 15px; left: 388px; background: limegreen;">
      <div class="grip" draggable='true'>
        <i class="fi fi-rr-grip-dots-vertical"></i>
      </div>
      <div class="question">
        <div class="question__input" id="question_0">
          <label for="question_input_0">Question :&nbsp;</label>
          <input type='text' id="question_input_0" name="question_0" placeholder='Go!'></input>
          <label for='answer_tag_0_0' style='display: none;'>Tag :&nbsp;</label>
          <input type='text' id='answer_tag_0_0' name='tag_0_0' class='answer_tag' style='display: none;' value='start'/>
        </div>
      </div>
      <div class="links">
        <div id="link_0_0" class="link_circle link_bottom"></div>
      </div>
    </div>`
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
    {name:"answer", text:"Réponse", icon:"fi fi-rr-comment-check", menu:[{name:'text', text: 'Texte', icon:'fi fi-rr-text'},{name:'img', text:'Image', icon:'fi fi-rr-picture'} , {name:'list', text:'Liste', icon:'fi fi-rr-list'}]},
    {name:"result", text:"Résultat", icon:"fi fi-rr-ranking-star"},
    {name:"group", text:"Grouper", icon:"fi fi-rr-object-group"},
    {name: "hr"},
    {name:"eraser", text:"Gomme", icon:"fi fi-rr-eraser"},
    {name: "hr"},
    {name:"upload", text:"Importer", icon:"fi fi-rr-upload", menu:[{name: 'file'}]},
    {name:"download", text:"Télécharger", icon:"fi fi-rr-download", menu:[{name: 'file'}]}
  ];
  addZoomIcons();
  createLabels(labels);
  initHandlers();
  initSvg();
  importExemple();
};

export const resetHandlers = () =>{

} 
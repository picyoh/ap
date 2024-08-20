import { addResultRow } from "./components/row/row.js";
import { submitHandlerResult } from "../submit/submitHandlers.js";

export const initResultForm = () => {
  const struct = `
    <div class='bottom'>
        <form id='results'>
          <h2>Resultats</h2>
        </form>
        <button type='button' class='add_result'>+</button>
        <div id='tags'></div>
    </div>
    `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", struct);
  initCloud();
  initTickmarkers();
  initSubmitR();
  addResultRow();
};

const initTickmarkers = () => {
  const tickMarkers = `    
    <datalist id="tickmarks">
      <option value="0"></option>
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option value="7"></option>
      <option value="8"></option>
      <option value="9"></option>
      <option value="10"></option>
    </datalist>
    `;
  const form = document.querySelector("#results");
  form.insertAdjacentHTML("beforeend", tickMarkers);
};

export const initPreview = (rowNumber) => {
  const preview = `
      <div class='preview' id='preview_${rowNumber}'>
          <div class="img__container">
          <i class="fa-regular fa-image fa-2xl img_preview"></i>
          </div>
          <p class='link_preview'>No link</p>
      </div>
      `;
  const results = document.querySelector("#result_row_" + rowNumber);
  results.insertAdjacentHTML("beforeend", preview);
};

export const initCloud = () => {
  const cloud = `
      <div class='tags__container'>
          <p class='result__tag' id='empty_tag'>empty</p>
      </div>
      `;
  const tags = document.querySelector("#tags");
  tags.insertAdjacentHTML("beforeend", cloud);
};

const initSubmitR = () => {
  const buttonR = `<button id='submitResult'>Submit</button>`;
  const formR = document.querySelector("#results");
  formR.insertAdjacentHTML("beforeend", buttonR);
  submitHandlerResult();
};

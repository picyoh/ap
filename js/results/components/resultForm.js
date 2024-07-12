//TODO: creer structure json reponses (ne pas oublier lien affil + lien image)
//TODO: gerer generation  du deuxieme formulaire
//TODO creer handlers
//TODO: gerer tags a chaque ajout de answer

import {initCloud} from './tags.js'
import { addResultRow } from './results.js';
import { submitHandlerResult } from '../../quizz/services/handlers.js';

export const initResultForm = () => {
  const struct = `
    <div class='bottom'>
        <form id='results'></form>
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

const initSubmitR = () => {
  const buttonR = `<button id='submitResult'>Submit</button>`;
  const formR = document.querySelector("#results");
  formR.insertAdjacentHTML("beforeend", buttonR);
  submitHandlerResult()
};
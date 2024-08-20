import { initSvg } from "./services/links/components/svg.js";
import { submitHandlerQuizz } from "../submit/submitHandlers.js";
import { handlers } from "./services/handlers.js";

export const initQuizzForm = () => {
  const form = `
    <form id='quizz'>
      <h2>Questionnaire</h2>
    </form>
    <div class='trash' data-drop-target='true'>
      <i class="fa-solid fa-trash-can fa-2xl"></i>
    </div>
    `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", form);
  initRow();
  initSubmit();
  initSvg();
};

const initRow = () => {
  const row = `
       <div id='rows'>
           <div class='row'>
               <div class='row__content' id='row_0'></div>
               <button type='button' class='add_row' id='0'>+</button>
           </div>
       </div>
       `;
  const form = document.querySelector("#quizz");
  form.insertAdjacentHTML("beforeend", row);
  const container = form.querySelector(".row__content");
  initContainer(container);
};

const initContainer = (parent) => {
  const container = `
        <div class='container'>
          <div class='question'>
            <div class='question__input'>
              <textarea type='text' id='question__input' name='question_0.0' placeholder='Go!'></textarea>
            </div>
          </div>
        </div>
        `;
  parent.insertAdjacentHTML("beforeend", container);
  handlers();
};

const initSubmit = () => {
  const button = `
        <button id='submit'>Submit</button>
        `;
  const form = document.querySelector("#quizz");
  form.insertAdjacentHTML("beforeend", button);
  submitHandlerQuizz();
};

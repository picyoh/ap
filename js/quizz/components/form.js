import { handlers, submitHandler } from "../services/handlers.js";
import { addQuestion } from "../components/question.js";
import { addAnswer } from "../components/answer.js";
import { initCanvas } from "../services/links.js";

//Init

export const addForm = () => {
  const form = `<form id='quizz'>
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
  </form>
  `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", form);
  initRow();
  initSubmit();
};

const initRow = () => {
  const row = `
     <div id='rows'>
         <div class='row'>
             <div class='row__content' id='row_0'></div>
             <button type='button' class='add_row'>+</button>
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
  initCanvas();
};

const initSubmit = () => {
  const button = `
      <button id='submit'>Submit</button>
      `;
  const form = document.querySelector("#quizz");
  form.insertAdjacentHTML("beforeend", button);
  submitHandler();
};

//Structure

export const addRow = (newRow) => {
  // get values for draggables
  const row = `
    <div class='row'>
        <div class='row__content' id='row_${newRow}' data-drop-target='true'>
        </div>
            <button type='button' class='add_row'>+</button>
        </div>
    </div>
    `;
  const form = document.querySelector("#rows");
  form.insertAdjacentHTML("beforeend", row);
  const containers = form.querySelectorAll(".row__content");
  const container = containers[containers.length - 1];
  addContainer(container);
};

export const addContainer = (parent) => {
  //container number
  const contNumber = parent.querySelectorAll(".container").length;
  const secondRow = parseInt(parent.id.split("_")[1]) >= 2;
  const container = `
    <div class='container' id='container_${contNumber}'>
      <div class='questions'>
        <button type='button' class='add_container' ${
          secondRow ? `>+</button>` : ` style='display: none;'>+</button>`
        }
      </div>
      <div class='answers' data-drop-target="true">
        <button type='button' class='add_answer'>+</button>
      </div>   
    </div>
    `;
  parent.insertAdjacentHTML("beforeend", container);
  const questions = parent.querySelectorAll(".questions");
  const lastQuestion = questions[questions.length - 1];
  addQuestion(parent, lastQuestion);
  const answers = parent.querySelectorAll(".answers");
  const lastAnswers = answers[answers.length - 1];
  addAnswer(parent, lastAnswers);
};

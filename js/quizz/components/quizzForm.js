import { handlers, submitHandler } from "../services/handlers.js";
import { addQuestion } from "./question.js";
import { addAnswer } from "./answer.js";
import { initSvg } from "../services/links/links.js";

//Init

export const addForm = () => {
  const form = 
  `
  <form id='quizz'></form>
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
  submitHandler();
};

//Structure

export const addRow = (newRow) => {
  // get values for draggables
  const row = `
    <div class='row'>
        <div class='row__content' id='row_${newRow}' data-drop-target='true'></div>
        <div class='row__answers' data-drop-target="true">
          <button type='button' class='add_answer' id='${newRow}'>+</button>
        </div>
        <button type='button' class='add_row' id='${newRow}'>+</button>
    </div>
    `;
  const form = document.querySelector("#rows");
  form.insertAdjacentHTML("beforeend", row);
  const containers = form.querySelectorAll(".row__content");
  const container = containers[containers.length - 1];
  addContainer(container);
};

export const addContainer = (parent) => {
  // get container number
  const contNumber = parseInt(parent.querySelectorAll(".container").length) + 1;
  // secondRow ?
  const secondRow = parseInt(parent.id.split("_")[1]) >= 2;
  // component
  const container = `
  <div class='container' id='container_${contNumber}'>
    <div class='questions'>
      <button type='button' class='add_container' ${secondRow ? `>+</button>` : ` style='display: none;'>+</button>`
    }
    </div>
    <div class='answers' data-drop-target="true">
      <button type='button' class='add_answer'>+</button>
    </div>
  </div>
    `;
  parent.insertAdjacentHTML("beforeend", container);
  // add Question
  const questions = parent.querySelectorAll(".questions");
  const lastQuestion = questions[questions.length - 1];
  addQuestion(parent, lastQuestion);
  // add Answers
  const answers = parent.querySelectorAll(".answers");
  const lastAnswers = answers[answers.length - 1];
  addAnswer(parent, lastAnswers);
};

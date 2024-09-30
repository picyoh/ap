import { addQuestion } from "../question/question.js";
import { addAnswer } from "../answer/answer.js";
import { addEmptyContainers } from "./emptyContainers.js";

export const addContainer = (parent) => {
  // get container number
  const count =
    parseInt(parent.querySelectorAll(".container").length) + 1;
  // secondRow ?
  const secondRow = parseInt(parent.id.split("_")[1]) >= 2;
  // component
  const container = `
  <div class='container' id='container_${count}'>
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
  // add Question
  const questions = parent.querySelectorAll(".questions");
  const lastQuestion = questions[questions.length - 1];
  addQuestion(parent, lastQuestion);
  // add Answers
  const answers = parent.querySelectorAll(".answers");
  const lastAnswers = answers[answers.length - 1];
  addAnswer(parent, lastAnswers);
  // add empty containers
  addEmptyContainers(parent, count);
};

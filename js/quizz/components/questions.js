import { handleQuizz } from "./quizzUtils.js";

export const questionChoice = () => {
  const questionChoice = `
    <div class='generator__questionChoice'>
      <input type="checkbox" id="questionChoice" name="questionChoice" value="questionChoice" />
      <label for="questionChoice">Cette question depend de la precedente ?</label>
    </div>
    `;
  const questionDiv = document.querySelector(".generator");
  //TODO : add code to insert
};

export const newQuestion = () => {
  const questionDivs = `
    <div class="generator__question">

    </div>
    <div class="generator__answers">
  
    <button class="generator__question__addAnswer">+</button>
  </div>
    `;
  const form = document.querySelector(".generator");
  form.insertAdjacentHTML("beforeend", question);
  newAnswer(counter);
  newAnswer(counter);
  counter++;
  handleQuizz();
};

export const newQuestionContent = () => {
  const content = `
  <h3>Question ${counter + 1}</h3>
  <label for="question">Question :</label>
  <input type="text" id="question" name="question">
  <button class="generator__question__addQuestion">+</button>
  `;
  //TODO: add code to insert
};

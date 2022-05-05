import { handleQuizz } from "./quizzGenerator.js";

let counter = 0;

export const newAnswer = (index) => {
  console.log(index);
  const answer = `
    <div class="generator___answers__input">
      <label for="question">Réponse :</label>
      <input type="text" id="question" name="question">
    </div>
  `;
  // get current answers group
  const answersGroup = document.querySelectorAll(".generator__answers");
  const lastAnswersGroup = answersGroup[index];
  lastAnswersGroup.insertAdjacentHTML("afterbegin", answer);
};

export const newQuestion = () => {
  const question = `
  <div class="generator__question">
    <h3>Question ${counter + 1}</h3>
    <label for="question">Votre question :</label>
    <input type="text" id="question" name="question">
    <button class="generator__question__addQuestion">+</button>
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

export const questionForm = () => {
  const form = `
  <form class="generator">

  </form>
  `;
  main.insertAdjacentHTML("afterbegin", form);
  newQuestion();
};

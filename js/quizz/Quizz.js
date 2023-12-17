import { handleQuizz } from "./quizzUtils.js";

let counter = 0;

export const questionForm = () => {
  const form = `
  <form class="generator">

  </form>
  `;
  main.insertAdjacentHTML("afterbegin", form);
  newQuestion();
};

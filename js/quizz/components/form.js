import { handleMultiple, handleSimple } from "../services/handlers.js";
import { newAnswer } from "./answers.js";
import { newSimpleContent, newMultiContent } from "./questions.js";

export const form = () => {
  const form = `
  <form class="generator">

  </form>
  `;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", form);
};

export const newContainer = (count) => {
  const questionDivs = `
    <div id="container__${count}" class="generator__container">
    </div>
    `;
  const form = document.querySelector(".generator");
  form.insertAdjacentHTML("beforeend", questionDivs);
};
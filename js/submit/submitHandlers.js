import { quizzToJson } from "../quizz/services/quizzGenerator.js";
import { resultToJson } from "../results/services/resultGenerator.js";

export const submitHandlerQuizz = () => {
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentNode);
    quizzToJson(e.target.parentNode);
  });
};

export const submitHandlerResult = () => {
  const submit = document.querySelector("#submitResult");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentNode);
    resultToJson(e.target.parentNode);
  });
};

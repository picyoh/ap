import { quizzToJson } from "./quizzGenerator.js";
import { resultToJson } from "./resultGenerator.js";

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

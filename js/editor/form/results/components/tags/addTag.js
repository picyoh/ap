import { handlers } from "../../../quizz/services/handlers.js";

export const addTag = (containerClass, value) => {
  const container = document.querySelector(containerClass);
  //console.log(containerClass, value)
  let tag;
  if (containerClass === ".tags__container") {
    tag = `<div class='tag' id='${value}' draggable='true'>${value}</div>`;
  }
  if (containerClass === ".tags__area") {
    tag = `<div class='result__tag' id='result__${value}' draggable='true'>${value}</div>`;
  }
  container.insertAdjacentHTML("beforeend", tag);
  handlers();
};

import { hideLinkHandler } from "../linksHandlers.js";

export const initSvg = () => {
  const svg = `
    <svg width='${window.innerWidth}' height='${window.innerHeight}' xmlns="http://www.w3.org/2000/svg"></svg>`;
  const page = document.querySelector("html");
  page.insertAdjacentHTML("afterbegin", svg);
  // add hide path button
  const quizz = document.querySelector("#quizz");
  const hideLinkBtn = `<button id='hide_links'>Hide Links</button>`;
  quizz.insertAdjacentHTML("beforeend", hideLinkBtn);
  hideLinkHandler();
};

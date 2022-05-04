import { handleLogin } from "./modale.js";
import { questionForm } from "./questionGenerator.js"

const main = document.querySelector("#main");

// trigger login button
const loginListener = document
  .querySelector(".login")
  .addEventListener("click", handleLogin);

questionForm();

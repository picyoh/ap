import { handleLogin } from "./auth/login.js";
import { questionForm } from "./quizz/Quizz.js"
import {handleQuizz} from "./quizz/quizzGenerator.js"

const main = document.querySelector("#main");

// trigger login button
const loginListener = document
  .querySelector(".login")
  .addEventListener("click", handleLogin);

questionForm();

lol on ajoute de la merde
plus plusmore
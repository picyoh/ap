import { form, newContainer } from "../components/form.js";
import { questionCheckbox, newSimpleContent, newMultiContent } from "../components/questions.js";
import { newAnswer, answerContent } from "../components/answers.js";
import { handleCheckbox, handleSimple, handleMultiple } from "./handlers.js";


let questionCount = 0;
let answerCount = 1;
let multiCount = 1;

export const init = () => {
form();
newQuestion();
};

export const newQuestion = () => {
  console.log("newQuestion", questionCount, answerCount);
  questionCount++;
  answerCount = 1;
  multiCount = 1;
  if (questionCount === 1) {
    newContainer(questionCount);
    newSimple(questionCount);
    /*
        document
        .querySelector(".generator__question__addAnswer")
        .classList.remove("hidden");
        */
  } else {
    newContainer(questionCount);
    questionCheckbox(questionCount);
    handleCheckbox();
  }
};

export const newSimple = () => {
  console.log("newSimple", questionCount)
  newSimpleContent(questionCount);
  newAnswer(questionCount, multiCount, answerCount);
  handleSimple();
};

export const newMultiple = () => {
  console.log(questionCount)
  newMultiContent(questionCount, multiCount);
  newAnswer(questionCount, multiCount, answerCount);
  handleMultiple();
};

export const addAnswer = (targetQuestion, targetMulti, nextAnswer) => {
  answerCount++;
  answerContent(targetQuestion, targetMulti, nextAnswer);
};

export const addQuestion = () => {
  multiCount++;
  console.log(questionCount);
  newMultiContent(questionCount, multiCount);
  newAnswer(questionCount, multiCount, answerCount);
  handleMultiple();
};
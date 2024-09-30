import { addQuestion } from "./question/question.js";
import { randomColor } from "../colorPicker/colorPicker.js";

export const clickHandler = (label) => {
  const wrapper = document.querySelector("#wrapper");
  wrapper.addEventListener("click", (e) => {
    let number;
    const pos = { x: e.pageX, y: e.pageY };
    const color = randomColor();
    switch (label) {
      case "question":
        number = getElementNumber("question");;
        addQuestion(number, pos, color);
        break;
      case "answer":
        addAnswer(number, e.target, 1);
        break;
      case "result":
        number = getElementNumber("result");
        addResult(number, pos, color);
        break;
      default:
        console.log("tools clickHandler failed");
        break;
    }
  }, {once: true});
};

const getElementNumber = (type) => {
  const elements = document.querySelectorAll(`.${type}`);
  return elements.length;
};

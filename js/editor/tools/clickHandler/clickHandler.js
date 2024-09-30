import { addQuestion } from "./question/question.js";
import { randomColor } from "../colorPicker/colorPicker.js";
import { addAnswer } from "./answer/answer.js";
import { randomPick } from "../colorPicker/colorPicker.js";
import { getColor } from "../colorPicker/colorPicker.js";

export const clickHandler = (label) => {
  const wrapper = document.querySelector("#wrapper");
  wrapper.addEventListener(
    "click",
    (e) => {
      let number;
      const pos = { x: e.pageX, y: e.pageY };
      const color = randomColor();
      switch (label) {
        case "question":
          number = getElementNumber("question");
          addQuestion(number, pos, color);
          break;
        case "result":
          number = getElementNumber("result");
          addResult(number, pos, color);
          break;
        case "answer_text":
        case "answer_img":
        case "answer_list":
          if (e.target.classList.contains("containers")) {
            const contNumber = parseInt(e.target.id.split('_')[1]);
            const contColor = getColor(e.target);
            const hue = randomPick(contColor);
            addAnswer(contNumber, 1, hue);
          }
          break;
        default:
          console.log("tools clickHandler failed");
          break;
      }
    },
    { once: true }
  );
};

const getElementNumber = (type) => {
  const elements = document.querySelectorAll(`.${type}`);
  return elements.length;
};
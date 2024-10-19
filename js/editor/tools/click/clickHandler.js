import { addQuestion } from "./question/question.js";
import { addAnswer } from "./answer/answer.js";
import { addResult } from "./result/result.js";
import { tagsHandler } from "../../tags/tags.js"
import { randomColor, randomPick, getColor } from "../colorPicker/colorPicker.js";
import { getRelativePosition } from "../../utils/position/getPosition.js";
import { getElementNumber } from "../../utils/getNumber/getNumber.js";

export const clickHandler = (label) => {
  const wrapper = document.querySelector("#wrapper");
  wrapper.addEventListener(
    "click",
    (e) => {
      let number;
      const parent = document.querySelector("#wrapper");
      const pos = getRelativePosition(e);
      const color = randomColor();
      switch (label) {
        case "question":
          number = getElementNumber("question");
          addQuestion(number, pos, color, parent);
          const hue = randomPick(color);
          addAnswer(number, 2, hue);
          break;
        case "result":
          number = getElementNumber("result");
          addResult(number, pos, color);
          tagsHandler();
          break;
        case "answer_text":
        case "answer_img":
        case "answer_list":
          if (e.target.classList.contains("containers")) {
            const contNumber = parseInt(e.target.id.split('_')[1]);
            const contColor = getColor(e.target);
            const hue = randomPick(contColor);
            addAnswer(contNumber, 1, hue, label);
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
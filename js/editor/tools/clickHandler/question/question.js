import { randomPick } from "../../colorPicker/colorPicker.js";
import {addAnswer} from "../answer/answer.js"

export const addQuestion = (countNumber, pos, color) => {
  const question = `
        <div class="containers" id="container_${countNumber}" draggable="true" style="top: ${pos.y}px; left: ${pos.x}px; background: rgb(${color.r},${color.g},${color.b});">
          <div class="question">
            <div class="question__input" id="question_${countNumber}">
              <label for="question_input_${countNumber}">Question :&nbsp;</label>
              <textarea id="question_input_${countNumber}" name="question_${countNumber}"></textarea>
              <input type="hidden" id="question_parent_${countNumber}" name="question_parent_${countNumber}"/>
            </div>
          </div>
          <div id="answers_${countNumber}" class="answers"></div>
        </div>`;
  document.querySelector("#wrapper").insertAdjacentHTML("afterbegin", question);
  const answers = document.querySelector(`#answers_${countNumber}`);
  const hue = randomPick(color);
  addAnswer(countNumber, answers, 2, hue);
};

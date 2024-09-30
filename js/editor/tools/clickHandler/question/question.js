import { randomPick } from "../../colorPicker/colorPicker.js";
import {addAnswer} from "../answer/answer.js"

export const addQuestion = (count, pos, color) => {
  const question = `
        <div class="containers" id="container_${count}" draggable="true" style="top: ${pos.y}px; left: ${pos.x}px; background: rgb(${color.r},${color.g},${color.b});">
          <div class="question">
            <div class="question__input" id="question_${count}">
              <label for="question_input_${count}">Question :&nbsp;</label>
              <textarea id="question_input_${count}" name="question_${count}"></textarea>
              <input type="hidden" id="question_parent_${count}" name="question_parent_${count}"/>
            </div>
          </div>
          <div id="answers_${count}" class="answers"></div>
        </div>`;
  document.querySelector("#wrapper").insertAdjacentHTML("afterbegin", question);
  const hue = randomPick(color);
  addAnswer(count, 2, hue);
};

import { randomPick } from "../../colorPicker/colorPicker.js";
import {addAnswer} from "../answer/answer.js"

export const addQuestion = (count, pos, color) => {
  const question = `
  <div
  id="container_${count}"
  class="containers question_container"
  draggable="true"
  style="top: ${pos.y}px; left: ${pos.x}px; background: rgb(${color.r},${color.g},${color.b});"
  >
    <div class="links">
      <div id="link_${count}" class="link_circle link_top"></div>
    </div>
    <div class="grip"><i class="fa-solid fa-grip-vertical"></i></div>
    <div class="question">
      <div id="question_${count}" class="question__input">
        <label for="question_input_${count}">Question:&nbsp;</label>
        <textarea id="question_input_${count}" name="question_${count}"></textarea>
        <input type="hidden" id="question_parent_${count}" name="question_parent_${count}" />
      </div>
      <div id="answers_${count}" class="answers"></div>
    </div>
  </div>
  `;
  document.querySelector("#wrapper").insertAdjacentHTML("beforeend", question);
  const hue = randomPick(color);
  addAnswer(count, 2, hue);
};

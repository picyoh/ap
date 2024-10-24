import { randomColor } from "../../colorPicker/colorPicker.js";
import { addAnswerOnList } from "./addAnswerOnList.js";
import { addPreview, updatePreview } from "../preview/preview.js";
import { resetHandlers } from "../../../handlers.js";

export const addAnswer = (count, iter, hue, label) => {
  const answers = document.querySelector(`#answers_${count}`);
  const answersNumber = answers.children
    ? parseInt(answers.children.length)
    : 0;
  for (let i = answersNumber; i < answersNumber + iter; i++) {
    const number = `${count}_${i}`;
    const color = randomColor(hue);
    const content = createContent(label, number);
    let answer = `
    <div id='answer_container_${number}' class='answer' style='background: rgb(${color.r}, ${color.g}, ${color.b})'>
      <div class="grip" draggable='true'>
        <i class="fi fi-rr-grip-dots-vertical"></i>
      </div>
      <div class='answer__input' id='answer_${number}'>
        ${content}
        <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}' class='answer_parents'/>
        <label for='answer_tag_${number}'>Tag :&nbsp;</label>
        <input type='text' id='answer_tag_${number}' name='tag_${number}' class='answer_tag' placeholder='Tag'/>
      </div>
      <div class="links">
        <div id="link_${number}" class="link_circle link_bottom"></div>
      </div>  
    </div>
    `;
    answers.insertAdjacentHTML("beforeend", answer);
  }
  if (label === "answer_img") {
    updatePreview(label, number);
  } else if (label === "answer_img") {
    addAnswerOnList(number);
  }
  resetHandlers();
};

const createContent = (label, number) => {
  let answer = "";
  if (label === "answer_text" || label === undefined) {
    answer = `
          <label for='answer_input_${number}'>Réponse :&nbsp;</label>
          <textarea id='answer_input_${number}' name='answer_${number}' placeholder='Réponse'></textarea>
            `;
  } else if (label === "answer_img") {
    const preview = addPreview(label, number);
    answer = `
          <label for='img_link_${number}'>Image link :</label>
          <input type='text' id='img_link_${number}' name='img_link_${number}' class='img_link' placeholder='https://'>
          ${preview}
            `;
  } else if (label === "answer_list") {
    answer = `
          <label for='answer_input_${number}'>Réponses :&nbsp;</label>
          <input type='text' id='answer_input_${number}' name='answer_${number}' placeholder='Réponses' />
          <button type='button' id='answer_input_button_${number}' class='list_button'>Add</button>
          <output id='answer_input_output_${number}' class='list_output' placeholder='Liste'></output>
            `;
  }
  return answer;
};

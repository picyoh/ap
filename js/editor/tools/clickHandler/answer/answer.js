import { randomColor } from "../../colorPicker/colorPicker.js";
import { addAnswerOnList } from "./addAnswerOnList.js";
import { addPreview, updatePreview } from "../../preview/preview.js";

export const addAnswer = (count, iter, hue, label) => {
  const answers = document.querySelector(`#answers_${count}`);
  const answersNumber = answers.children
    ? parseInt(answers.children.length)
    : 0;
  for (let i = answersNumber; i < answersNumber + iter; i++) {
    const number = `${count}_${i}`;
    const color = randomColor(hue);
    let answer = "";
    if (label === "answer_text" || label === undefined) {
      answer = `
        <div class='answer' draggable='true' style='background: rgb(${color.r}, ${color.g}, ${color.b})'>
          <div class='answer__input' id='answer_${number}'>
            <label for='answer_input_${number}'>Réponse :&nbsp;</label>
            <textarea id='answer_input_${number}' name='answer_${number}'></textarea>
            <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}'/>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}' class='answer_tag' />
          </div>
        </div>
              `;
      answers.insertAdjacentHTML("beforeend", answer);
    } else if (label === "answer_img") {
      //TODO: add upload image and store a copy in a folder ?
      const preview = addPreview(label, number);
      answer = `
        <div class='answer' draggable='true' style='background: rgb(${color.r}, ${color.g}, ${color.b})'>
          <div class='answer__input' id='answer_${number}'>
            <label for='img_link_${number}'>Image link :</label>
            <input type='text' id='img_link_${number}' name='img_link_${number}' class='img_link' placeholder='https://'>
            ${preview}
            <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}'/>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}' class='answer_tag' />
          </div>
        </div>
              `;
      answers.insertAdjacentHTML("beforeend", answer);
      updatePreview(label, number);
    } else if (label === "answer_list") {
      answer = `
        <div class='answer' draggable='true' style='background: rgb(${color.r}, ${color.g}, ${color.b})'>
          <div class='answer__input' id='answer_${number}'>
            <label for='answer_input_${number}'>Réponses :&nbsp;</label>
            <input type='text' id='answer_input_${number}' name='answer_${number}'></input>
            <button type='button' id='answer_input_button_${number}' class='list_button'>Add</button>
            <output id='answer_input_output_${number}' class='list_output'></output>
            <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}'/>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}' class='answer_tag' />
          </div>
        </div>
              `;
      answers.insertAdjacentHTML("beforeend", answer);
      addAnswerOnList(number);
    }
  }
};

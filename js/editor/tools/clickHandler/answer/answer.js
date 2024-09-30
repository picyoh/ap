import { randomColor } from "../../colorPicker/colorPicker.js";

export const addAnswer = (count, iter, hue) => {
  const answers = document.querySelector(`#answers_${count}`);
  const answersNumber = answers.children ? parseInt(answers.children.length) : 0;
  for (let i = answersNumber ; i < answersNumber + iter; i++) {
    const number = `${count}_${i}`;
    const color = randomColor(hue); 
    const answer = `
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
  }
};

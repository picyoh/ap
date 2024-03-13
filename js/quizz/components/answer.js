import { handlers } from "../services/handlers.js";

export const addAnswer = (parent, lastAnswers) => {
  const rowNumber = parseInt(parent.id.split("_")[1]);
  const questionNumber = parent.querySelectorAll(".container").length;
  const answerNumber = lastAnswers.children.length;
  const number = rowNumber + '.' + questionNumber + '.' + answerNumber;
  const answersBtn = lastAnswers.querySelector("button");
  //console.log(parent, rowNumber, questionNumber, answerNumber, lastAnswers);
  const answer = `
    <div class='answer'>
        <div class='link' id='answer_link_${number}' linkable='true' link-target='true'></div>    
        <div class='answer__input' id='answer_${number}' draggable='true'>
            <label for='answer_input_${number}'>Réponse :&nbsp;</label>
            <textarea id='answer_input_${number}' name='answer_${number}'></textarea>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}'/>
            <label for='answer_value_${number}'>Valeur :&nbsp;</label>
            <input type='range' min='0' max='10' step='1' value='5' id='answer_value_${number}' name='value_${number}' list='tickmarks'/>
            <input type='hidden' name='answer_parent_${number}' />
        </div>
    </div>
    `;
  answersBtn.insertAdjacentHTML("beforebegin", answer);
  handlers();
};

import { handlers } from "../services/handlers.js";

export const addAnswer = (parent, lastAnswers, targetId) => {
  // empty targetId are not at row level
  const rowLevel = targetId > 0;
  // get Numbers
  const rowNumber = rowLevel ? targetId : parseInt(parent.id.split("_")[1]);
  const questionNumber = rowLevel ? 0 : parseInt(lastAnswers.parentNode.id.split('_')[1]);
  const answerNumber = lastAnswers.children.length;
  // concatenate numbers
  const number = rowNumber + '.' + questionNumber + '.' + answerNumber;
  // get target to append
  const answersBtn = lastAnswers.querySelector("button");

  //console.log(parent, rowNumber, questionNumber, answerNumber, lastAnswers);
  const answer = `
    <div class='answer'>
        ${rowLevel ? `` : `<div id='answer_link_${number}' class='link' linkable='true'></div>`}    
        <div class='answer__input' id='answer_${number}' draggable='true'>
            <label for='answer_input_${number}'>Réponse :&nbsp;</label>
            <textarea id='answer_input_${number}' name='answer_${number}'></textarea>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}'/>
            ${rowLevel ? `` : `
            <input type='hidden' name='answer_parent_${number}' />
            `}
        </div>
    </div>
    `;
  answersBtn.insertAdjacentHTML("beforebegin", answer);
  handlers();
};

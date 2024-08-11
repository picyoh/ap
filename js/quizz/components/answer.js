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
  // get question_parent value
  const questionParentId = 'question_parent_' + rowNumber + '.' + questionNumber;
  const questionParentDom = document.getElementById(questionParentId);
  let questionParentValue;
  if(questionParentDom !== null){
    questionParentValue = questionParentDom.value;
  }else {
    questionParentValue = '';
  }

  //console.log(parent, rowNumber, questionNumber, answerNumber, lastAnswers, questionParentValue);
  const answer = `
    <div class='answer'>
        ${rowLevel ? `` : `<div id='answer_link_${number}' class='link' linkable='true' link-target='true'></div>`}    
        <div class='answer__input' id='answer_${number}' draggable='true'>
            <label for='answer_input_${number}'>Réponse :&nbsp;</label>
            <textarea class='answer_inputs' id='answer_input_${number}' name='answer_${number}'></textarea>
            <label for='answer_tag_${number}'>Tag :&nbsp;</label>
            <input type='text' id='answer_tag_${number}' name='tag_${number}' class='answer_tag' />
            ${rowLevel ? `` : `
            <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}' value='${questionParentValue}' />
            `}
        </div>
    </div>
    `;
  answersBtn.insertAdjacentHTML("beforebegin", answer);
  handlers();
};

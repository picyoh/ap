import {addAnswer} from "../answer/answer.js"

export const addQuestion = (contNumber, target) => {
  const
  const question = `
            <div class='question'>
                <div class='question__input' id='question_${contNumber} draggable='true'>
                    <label for='question_input_${contNumber}'>Question :&nbsp;</label>
                    <textarea id='question_input_${contNumber}' name='question_${contNumber}'></textarea>
                    <input type='hidden' id='question_parent_${contNumber}' name='question_parent_${contNumber}'/>
                </div>
            </div>
            `;
  target.insertAdjacentHTML("afterbegin", question);
  //TODO: add 2 answers
  addAnswer(contNumber, target, 2)
};

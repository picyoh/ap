import {handlers} from "../services/handlers.js"

export const addAnswer = (parent, lastAnswers) => {
    const rowNumber = parseInt(parent.id.split('_')[1]);
    const questionNumber = parent.querySelectorAll('.container').length;
    const answerNumber = lastAnswers.children.length;
    const answersBtn = lastAnswers.querySelector('button');
    //console.log(parent, rowNumber, questionNumber, answerNumber, lastAnswers);
    const answer = 
    `
    <div class='answer' id='answer_${rowNumber}.${questionNumber}.${answerNumber} 'draggable='true'>
        <div class='answer_link' linkable='true'></div>    
        <div class='answer__input'>
            <label for='answer_input'>Réponse : </label>
            <input type='text' id='answer_input' name='answer_${rowNumber}.${questionNumber}.${answerNumber}' />
            <label for='answer_value'> Valeur :</label>
            <input type='text' id='answer_value' name='value_${rowNumber}.${questionNumber}.${answerNumber}' />
        </div>
    </div>
    `;
    answersBtn.insertAdjacentHTML('beforebegin', answer);
    handlers();
}
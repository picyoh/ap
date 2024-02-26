import {handlers} from "../services/handlers.js"
export const addAnswer = (parent, container) => {
    const rowNumber = parseInt(parent.id.split('_')[1]);
    const questionNumber = parent.querySelectorAll('.container').length;
    const answerNumber = container.children.length;
    const firstAnswer = answerNumber <= 1;
    //TODO: add answer__link + css + draggable in template
    //TODO: ajouter seconde reponse (jamais une seule reponse)
    //console.log(parent, rowNumber, questionNumber, answerNumber, container);
    const answer = 
    `
    <div class='answer' id='answer_${rowNumber}.${questionNumber}.${answerNumber}' ${firstAnswer ? `draggable='true'>` : `>`}
        <div class='answer__input'>
            <label for='answer_input'>Réponse : </label>
            <input type='text' id='answer_input' name='answer_${rowNumber}.${questionNumber}.${answerNumber}' />
            <label for='answer_value'> Valeur :</label>
            <input type='text' id='answer_value' name='value_${rowNumber}.${questionNumber}.${answerNumber}' />
        </div>
    </div>
    `;
    container.insertAdjacentHTML('afterbegin', answer);
    handlers();
}
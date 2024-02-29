export const addQuestion = (parent, lastAnswers) => {
    // numbering
    const rowNumber = parseInt(parent.id.split('_')[1]);
    const questionNumber = parent.querySelectorAll('.container').length;
    const isQMulti= questionNumber >= 2;
    //console.log(rowNumber, questionNumber, isQMulti);
    const question = 
    `
    <div class='question' id='question_${rowNumber}.${questionNumber}'>
        <div class='question__input'>
            <div class='question_link' linkable='true' ${isQMulti ? `></div>` : `style='display: none;'></div>`}
            <label for='question_input'>Question : </label>
            <input type='text' id='question_input' name='question_${rowNumber}.${questionNumber}' />
        </div>
    </div>
    `;
    lastAnswers.insertAdjacentHTML('beforebegin', question);

    // display links
    if(isQMulti){
        const link = parent.querySelector('.question_link');
        //console.log(lastAnswers, link);
        link.removeAttribute('style');
    }
};
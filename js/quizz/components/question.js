export const addQuestion = (parent, lastQuestion) => {
    // numbering
    const rowNumber = parseInt(parent.id.split("_")[1]);
    const questionNumber = parent.querySelectorAll(".container").length;
    const secondRow = parseInt(parent.id.split("_")[1]) >= 2;
    const number = rowNumber + '.' + questionNumber;
    const isQMulti = questionNumber >= 2;
    //console.log(rowNumber, questionNumber, isQMulti);
    const question = `
    <div class='question'>
        <div id='question_link_${number}' class='link' link-target='true' ${isQMulti ? `>` : `style='display: none;'>`}</div>
        <div class='question__input' id='question_${number}' ${secondRow ? `draggable='true'>` : `>`}
            <label for='question_input_${number}'>Question :&nbsp;</label>
            <textarea id='question_input_${number}' name='question_${number}'></textarea>
            <input type='hidden' name='question_parent_${number}'/>
        </div>
    </div>
    `;
    lastQuestion.insertAdjacentHTML("afterbegin", question);

    // display link if qMulti
    if (isQMulti) {
        const link = parent.querySelector(".link");
        link.removeAttribute("style");
    }
};

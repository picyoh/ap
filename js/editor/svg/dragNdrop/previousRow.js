import { getValues } from "./getValues.js";

export const removeEmptyRow = () => {
  //get rows
  const rows = document.querySelectorAll(".row__content");
  rows.forEach((row) => {
    //get row length
    const rowlength = row.querySelectorAll(".container").length;
    if (rowlength === 0) {
      //remove
      row.parentNode.remove();
      checkPreviousRow();
    }
  });
};

export const checkPreviousRow = (dragged) => {
  //TODO: rework / refactor
  const draggedType = dragged.id.split("_")[0];
  //console.log(dragged, draggedType);
  const draggedNumber = getNumber(dragged.id);
  const draggedNumberSplit = draggedNumber.split(".");
  const rowNumber = parseInt(draggedNumberSplit[0]);
  const questionNumber = parseInt(draggedNumberSplit[1]);
  const answerNumber = parseInt(draggedNumberSplit[2]);
  // get row
  const rowContent = document.querySelectorAll(".row__content")[rowNumber];
  const containerId = "#container_" + questionNumber;
  // get question parent
  const container = rowContent.querySelector(containerId);

  let answers;
  let buttonId;

  // set the elements set
  let elements;
  let start;
  if (draggedType === "question") {
    elements = Array.from(rowContent.querySelectorAll(".question__input"));
    start = questionNumber - 1;
  }
  if (draggedType === "answer") {
    // get answers container + buttonId in it
    answers = container.querySelector(".answers");
    buttonId = answers.querySelector(".add_answer").id;
    elements = Array.from(container.querySelectorAll(".answer__input"));
    start = answerNumber - 1;
  }
  // get elements length
  const eLength = elements.length - 1;
  let removeCount = 0;
  let values = [];
  //console.log(start, elements, eLength, rowContent);
  // remove loop
  for (let i = start; i <= eLength; i++) {
    const ref = i + 1;
    if (draggedType === "question") {
      const idNumber = parseInt(elements[i].id.split("_")[1].split(".")[1]);
      if (idNumber !== ref) {
        const value = getValues(elements[i], elements[i].classNodes[0]);
        values.push(value);
        removeCount++;
        elements[i].parentNode.parentNode.parentNode.remove();
        //console.log(idNumber, ref, removeCount, elements[i], elements[i].classNodes[0]);
      }
    }
    if (draggedType === "answer") {
      const idNumber = parseInt(elements[i].id.split("_")[1].split(".")[2]);
      if (idNumber !== ref) {
        const value = getValues(elements[i], elements[i].classNodes[0]);
        values.push(value);
        removeCount++;
        elements[i].parentNode.remove();
        console.log(idNumber, ref, removeCount, elements[i]);
      }
    }
  }
  //console.log(values);
  // append loop
  for (let j = 1; j <= removeCount; j++) {
    if (draggedType === "question") {
      addContainer(rowContent);
      const questions = rowContent.querySelectorAll(".container");
      const newElement = questions[questions.length - 1];
      setValues(values[j - 1], "question__input", newElement);
    }
    if (draggedType === "answer") {
      addAnswer(rowContent, answers, buttonId);
      const answerInputs = answers.querySelectorAll(".answer__input");
      const newElement = answerInputs[answerInputs.length - 1];
      console.log(answers.children[answers.children.length - 2], newElement);
      setValues(values[j - 1], "answer__input", newElement);
    }
  }
};

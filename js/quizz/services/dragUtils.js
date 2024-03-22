import { addAnswer } from "../components/answer.js";
import { addContainer } from "../components/form.js";

const getNumber = (targetId) => {
  //console.log(targetId);
  const targetSplit = targetId.split("_");
  const targetSplitLast = targetSplit.length - 1;
  const targetNumber = targetSplit[targetSplitLast];
  return targetNumber;
};

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

// get values

export const getValues = (dataDom, dataClass) => {
  //console.log(dataDom, dataClass);
  const values = [];
  let elementChildNodes;
  // answer case
  if (dataClass === "answer__input") {
    elementChildNodes = dataDom.childNodes;
  }
  // question case
  if (dataClass === "question__input") {
    // Method to concat DOM nodes
    const questionNodes = Array.from(dataDom.childNodes);
    const answerNodes = Array.from(
      dataDom.parentNode.parentNode.parentNode.querySelector(".answer__input")
        .childNodes
    );
    elementChildNodes = questionNodes.concat(answerNodes);
  }
  // stack the values
  elementChildNodes.forEach((element) => {
    if (element.name) {
      values.push(element.value);
    }
  });
  return values;
};

// set values

export const setValues = (values, dataClass, newElement) => {
  console.log(newElement)
  let elementChildNodes;
  // answer case
  if (dataClass === "answer__input") {
    elementChildNodes = newElement.childNodes;
  }
  // question case
  if (dataClass === "question__input") {
    const questionNodes = Array.from(
      newElement.querySelector(".question__input").childNodes
    );
    const answerNodes = Array.from(
      newElement.querySelector(".answer__input").childNodes
    );
    elementChildNodes = questionNodes.concat(answerNodes);
    console.log(elementChildNodes)
  }

  let index = 0;
  // set the values
  elementChildNodes.forEach((element) => {
    if (element.name) {
      //console.log(values, index);
      element.value = values[index];
      index++;
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
        const value = getValues(elements[i], elements[i].classList[0]);
        values.push(value);
        removeCount++;
        elements[i].parentNode.parentNode.parentNode.remove();
        //console.log(idNumber, ref, removeCount, elements[i], elements[i].classList[0]);
      }
    }
    if (draggedType === "answer") {
      const idNumber = parseInt(elements[i].id.split("_")[1].split(".")[2]);
      if (idNumber !== ref) {
        const value = getValues(elements[i], elements[i].classList[0]);
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
      const answerInputs = answers.querySelectorAll('.answer__input');
      const newElement = answerInputs[answerInputs.length - 1];
      console.log(answers.children[answers.children.length - 2], newElement);
      setValues(values[j - 1], 'answer__input', newElement)

    }
  }
};

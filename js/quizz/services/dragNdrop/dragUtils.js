import { addAnswer } from "../../components/answer.js";
import { addContainer } from "../../components/quizzForm.js";
import { createLink, getPositions } from "../links/links.js";

export const getNumber = (targetId) => {
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

export const getValues = (dataDom, dataClass) => {
  //console.log(dataDom, dataClass);
  const values = [];
  let elementChildNodes;
  // answer case
  if (dataClass === "answer__input") {
    elementChildNodes = dataDom.children;
  }
  // question case
  if (dataClass === "question__input") {
    // get DOM nodes
    const questionNodes = [...dataDom.children];
    const parent = dataDom.parentNode.parentNode.parentNode;
    const answers = [...parent.querySelectorAll('.answer__input')];
    let answerNodes = [];
    // stack children
    answers.forEach((answer)=>{
      if(answerNodes.length === 0){
        answerNodes = [...answer.children]
      }else {
        answerNodes = [...answerNodes, ...answer.children]
      }
      //console.log(answerNodes)
    })
    // concat
    elementChildNodes = [...questionNodes, ...answerNodes];
  }
  // stack the values
  elementChildNodes.forEach((element) => {
    if (element.name) {
      values.push(element.value);
    }
  });
  //console.log(values)
  const parentValueNumber = values[1].split('_')[1] ;
  const dataDomNumber = dataDom.id.split('_')[1];
  const pathId = 'path_' + parentValueNumber + '_' + dataDomNumber;
  document.getElementById(pathId).remove();

  return values;
};

export const setValues = (values, dataClass, newElement) => {
  let elementChildNodes;
  // answer case
  if (dataClass === "answer__input") {
    elementChildNodes = newElement.children;
  }
  // question case
  if (dataClass === "question__input") {
    const questionNodes = [...newElement.querySelector(".question__input").children];
    const answers = [...newElement.querySelectorAll(".answer__input")]
    let answerNodes = [];
     // stack children
     answers.forEach((answer)=>{
      if(answerNodes.length === 0){
        answerNodes = [...answer.children]
      }else {
        answerNodes = [...answerNodes, ...answer.children]
      }
    });
    // concat
    elementChildNodes = [...questionNodes, ...answerNodes];
    //console.log(elementChildNodes)
    /* Update Links */
    // get parent element
    const parentElement = document.getElementById(values[1]);
    // get parent link element
    const parentLinkElement = parentElement.parentNode.firstElementChild;
    // get current question element
    const currentQuestion = questionNodes[0].parentNode;
    // get current question link element
    const currentQuestionLink = questionNodes[0].parentNode.parentNode.firstElementChild;
    // create new path
    getPositions(parentLinkElement, 'start');
    getPositions(currentQuestionLink, 'end');
    createLink(parentElement, currentQuestion);
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
      const answerInputs = answers.querySelectorAll('.answer__input');
      const newElement = answerInputs[answerInputs.length - 1];
      console.log(answers.children[answers.children.length - 2], newElement);
      setValues(values[j - 1], 'answer__input', newElement)

    }
  }
};

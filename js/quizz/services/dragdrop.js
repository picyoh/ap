import {
  checkPreviousRow,
  removeEmptyRow,
  getValues,
  setValues,
} from "./dragUtils.js";
import { addContainer } from "../components/form.js";
import { addAnswer } from "../components/answer.js";
// drag start
const dragStartHandler = (e) => {
  e.stopPropagation();
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.effectAllowed = "move";
  //console.log(e.dataTransfer, e.target.id);
};

// drag over
const dragOverHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "move";
};

// drop
const dropHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const data = e.dataTransfer.getData("text/plain");
  const dataDom = document.getElementById(data);
  const dataClass = dataDom.classList.value;
  const targetClass = e.target.classList.value;
  const parent = dataDom.parentNode.parentNode.parentNode
  //console.log(e.target, dataDom, targetClass, dataClass);
  //TODO: move check of target to enter/over ?
  if (e.target.classList.value === "trash") {
    // trash case
    //TODO: check remove answer
    checkPreviousRow(dataDom);
    parent.remove();
  } else {
    // containers case
    if (targetClass === "row__content" && dataClass === "question__input") {
      // get values
      const values = getValues(dataDom, dataClass);
      // add container
      addContainer(e.target);
      //add answer if necessary
      if(values.length > 5){
        const answerIndex = (values.length -5) / 3;
        const answers = e.target.querySelectorAll('.answers');
        const lastAnswers = answers[answers.length-1]
        const buttonId = lastAnswers.querySelector('button').id
        //console.log(answerIndex, e.target, lastAnswers, buttonId)
        for(let i =0; i< answerIndex; i++){
          addAnswer(e.target, lastAnswers, buttonId);
        }
      }
      // remove previous 
      parent.remove();
      removeEmptyRow();
      // get new container
      const containers = e.target.querySelectorAll(".container");
      const containersLength = parseInt(containers.length - 1);
      const newContainer = containers[containersLength];
      // set values
      setValues(values, dataClass, newContainer);
      // renumber previous row
      checkPreviousRow(dataDom);
    }
    // answers cases
    if (
      (targetClass === "answers" && dataClass === "answer__input") ||
      (targetClass === "row__answers" && dataClass === "answer__input")
    ) {
      // stack values
      const values = getValues(dataDom, dataClass);
      // get parent button for rowLevel
      const targetId = parseInt(e.target.querySelector("button").id);
      // add new answer
      addAnswer(e.target.parentNode.parentNode, e.target, targetId);
      // remove previous node
      dataDom.parentNode.remove();
      // retrieve new answer
      const answers = e.target.querySelectorAll(".answer__input");
      const answersLength = parseInt(answers.length - 1);
      const newAnswer = answers[answersLength];
      // set values
      setValues(values, dataClass, newAnswer);
      // renumber previous row
      checkPreviousRow(dataDom);
    }
  }
};

// Trigger
export const dragDropHandler = () => {
  // get draggable elements
  const draggables = document.querySelectorAll("[draggable]");
  //console.log(draggables);
  draggables.forEach((draggable) => {
    // trigger event
    draggable.addEventListener("dragstart", (e) => {
      dragStartHandler(e);
    });
  });
  // get targets
  const targets = document.querySelectorAll("[data-drop-target]");
  targets.forEach((target) => {
    // trigger events
    target.addEventListener("dragover", (e) => {
      dragOverHandler(e);
    });
    target.addEventListener("drop", (e) => {
      dropHandler(e);
    });
  });
};

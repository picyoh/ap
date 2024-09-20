import { getValues } from "./getValues.js";
import { setValues } from "./setValues.js";
import { addAnswer } from "../../components/answer/answer.js";

export const dropHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const data = e.dataTransfer.getData("text/plain");
  const dataDom = document.getElementById(data);
  if (dataDom === null) return;
  const dataClass = dataDom.classList.value;
  const targetClass = e.target.classList.value;
  const parent = dataDom.parentNode.parentNode.parentNode;
  //console.log(e.target, dataDom, targetClass, dataClass);
  //TODO: refactor this part
  if (targetClass === "trash") {
    if (dataClass === "result__tag") {
      //tags cases
      dataDom.remove();
    } else {
      // others cases
      if (dataClass === "answer__input") {
        dataDom.parentNode.remove();
      }
      if (dataClass === "") {
        checkPreviousRow(dataDom);
        parent.remove();
      }
    }
  } else {
    // containers case
    if (targetClass === "row__content" && dataClass === "question__input") {
      // get values
      const values = getValues(dataDom, dataClass);
      // add container
      addContainer(e.target);
      //add answer if necessary
      if (values.length > 5) {
        const answerIndex = (values.length - 5) / 3;
        const answers = e.target.querySelectorAll(".answers");
        const lastAnswers = answers[answers.length - 1];
        const buttonId = lastAnswers.querySelector("button").id;
        //console.log(answerIndex, e.target, lastAnswers, buttonId)
        for (let i = 0; i < answerIndex; i++) {
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
      // check input parent value
      const parentValue = dataDom.querySelector("input[type=hidden]").value;
      /*       if (parentValue) {
          // update paths
          pathHandler();
        } */
    }
    // answers cases
    if (
      (targetClass === "answers" && dataClass === "answer__input") ||
      (targetClass === "row__answers" && dataClass === "answer__input")
    ) {
      console.log(dataDom)
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
    //tag cases
    if (targetClass === "tags__area" && dataClass === "tag") {
      addTag(".tags__area", data);
    }
  }
};

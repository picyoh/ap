import { getNumber } from "../../../utils/getNumber/getNumber.js";

export const addParentValue = (dragged, target) => {
  // get Numbers in arrays
  const draggedNumber = getNumber(dragged.id);
  const targetNumber = getNumber(target.id);
  //console.log(draggedNumber, targetNumber);
  // Compare => answer = parentElement, question = childElement
  // get question id
  let childElement =
    draggedNumber.length === 3
      ? dragged
      : targetNumber.length === 3
      ? target
      : "";
  //console.log(draggedNumber.length, targetNumber.length);
  // sort if answers
  if (childElement === "") {
    // get lower answer id
    for (let i = 0; i < 3; i++) {
      //console.log(draggedNumber[i], targetNumber[i]);
      if (draggedNumber[i] !== targetNumber[i]) {
        draggedNumber[i] > targetNumber[i]
          ? (childElement = dragged)
          : (childElement = target);
        break;
      }
    }
  }
  // get parentElement
  const parentElement = target === childElement ? dragged : target;
  // get parent tag
  let tagValue = "";
  // first tag case
  if (parentElement.id === "link_0") {
    tagValue = "start";
  } else {
    const targetTag = `answer_${parentElement.id.replace("link", "tag")}`;
    tagValue = document.getElementById(targetTag).value;
    console.log(targetTag, tagValue)
  }
  //console.log(parentElement, childElement);
  // get parent dom
  const parentContainer = document.getElementById(childElement.id).parentNode
    .parentNode;
  //console.log(parentContainer)
  // get values
  let values = parentContainer
    .querySelector("input[type=hidden]")
    .value.split(",");
  if (values[0] === "") {
    values = tagValue;
  } else {
    values.push(tagValue);
  }
  parentContainer.querySelector("input[type=hidden]").value = values;
  //set tag on children answers parent value
  const answers =
    parentContainer.parentNode.parentNode.querySelectorAll(".answer");
  //console.log(tagValue, answers);
  answers.forEach((answer) => {
    let values = answer.querySelector("input[type=hidden]").value.split(",");
    if (values[0] === "") {
      values = tagValue;
    } else {
      values.push(tagValue);
    }
    answer.querySelector("input[type=hidden]").value = values;
  });
};

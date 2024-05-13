import { getNumber } from "./dragUtils.js";

let start = { x: 0, y: 0 };
let center = { x: 0, y: 0 };
let end = { x: 0, y: 0 };
let mouse = { x: 0, y: 0 };
let request;

export const initSvg = () => {
  const svg = `
  <svg width='${window.innerWidth}' height='${window.innerHeight}' xmlns="http://www.w3.org/2000/svg"></svg>`;
  const page = document.querySelector("html");
  page.insertAdjacentHTML("afterbegin", svg);
};

const addTempPath = () => {
  const path = `
  <path 
    id='temp_path' 
    d="M${start.x},${start.y} Q${center.x},${center.y} ${mouse.x},${mouse.y}" 
    fill="none" 
    stroke="black" 
    stroke-width="5" 
  />`;
  const svg = document.querySelector("svg");
  svg.insertAdjacentHTML("beforeend", path);
};

export const resetTemp = () => {
  cancelRequest();
  //reset temp
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) tempPath.remove();
};

export const getPositions = (element, type) => {
  const rect = element.getBoundingClientRect();
  switch (type) {
    case "start":
      start.x = rect.x + rect.width / 2;
      start.y = rect.y + rect.height / 2;
      //console.log(start);
      break;
    case "end":
      end.x = rect.x + rect.width / 2;
      end.y = rect.y + rect.height / 2;
      //console.log(end);
      break;
    default:
      console.log("get position type error");
      break;
  }
};

export const updateMousePosition = (mouseEvent) => {
  mouse.x = mouseEvent.clientX;
  mouse.y = mouseEvent.clientY;
  //TODO:console.log(mouse);
  updateMouse();
};

const cancelRequest = () => {
  window.cancelAnimationFrame(request);
};

const updateMouse = () => {
  // remove previous path
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) tempPath.remove();
  // get center point
  center.x = (mouse.x + start.x) / 2;
  center.y = (mouse.y + start.y) / 2 + 100;
  //add new path
  addTempPath();
  //console.log(start.x, center.x, mouse.x, end.x, request);
  cancelRequest();
  request = window.requestAnimationFrame(updateMouse);
};

export const createLink = (first, second) => {

  // get numbers and concatenate
  const firstNumber = getNumber(first.id);
  const secondNumber = getNumber(second.id);
  const pathId = "path_" + firstNumber + "_" + secondNumber;
  // get center point
  center.x = (end.x + start.x) / 2;
  center.y = (end.y + start.y) / 2 + 100;

  // draw path
  const path = `
  <path 
    id=${pathId}
    class='paths'
    d="M${start.x},${start.y} Q${center.x},${center.y} ${mouse.x},${mouse.y}" 
    fill="none" 
    stroke="black" 
    stroke-width="3" 
  />`;
  const svg = document.querySelector("svg");
  svg.insertAdjacentHTML("beforeend", path);
  //console.log(start, center, end)
  resetTemp()
};

export const pathHandler = () => {
  const paths = document.querySelectorAll(".paths");
  paths.forEach((path) => {
    updatePath(path.id);
  });
};

const updatePath = (pathId) => {
  // split canvas Id
  const split = pathId.split("_");
  const first = split[1];
  const second = split[2];
  // get links ids
  const firstId =
    first.length === 3
      ? "question_link_" + first
      : first.length === 5
      ? "answer_link_" + first
      : "";
  const secondId =
    second.length === 3
      ? "question_link_" + second
      : second.length === 5
      ? "answer_link_" + second
      : "";
  //console.log(firstId, secondId);
  // get links elements
  const firstElement = document.getElementById(firstId);
  const secondElement = document.getElementById(secondId);
  // get positions
  getPositions(firstElement, "start");
  getPositions(secondElement, "end");
  // delete previous links
  document.getElementById(pathId).remove();
  //console.log(pathId);
  // re generate link
  createLink(firstElement, secondElement);
};

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
  const parentSplit = parentElement.id.split("_");
  const parentId = parentSplit[0] + "_" + parentSplit[2];
  //console.log('child : ' + childElement , 'parentId : '+ parentId);
  // set parent on input hidden
  document
    .getElementById(childElement.id)
    .parentElement.querySelector("input[type=hidden]").value = parentId;
};

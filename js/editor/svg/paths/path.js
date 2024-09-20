import { addCircle, removeCircle } from "./components/circles.js";
import { pathClickHandler } from "./linksHandlers.js";
import { getNumber } from "../dragNdrop/getNumber.js";

let start = { x: 0, y: 0 };
let center = { x: 0, y: 0 };
let end = { x: 0, y: 0 };
let mouse = { x: 0, y: 0 };
let request;

const addTempPath = () => {
  const path = `
  <path 
    id='temp_path' 
    d="M${start.x},${start.y} Q${center.x},${center.y} ${mouse.x},${mouse.y}" 
    fill="none" 
    stroke="black" 
    stroke-width="3" 
  />`;
  const svg = document.querySelector("svg");
  svg.insertAdjacentHTML("beforeend", path);
  addCircle("temp", start.x, start.y);
};

export const resetTemp = () => {
  cancelRequest();
  // reset temp
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) {
    // remove temp path
    tempPath.remove();
    // remove circle
    removeCircle("temp");
  }
};

const cancelRequest = () => {
  window.cancelAnimationFrame(request);
};

export const getPositions = (element, type) => {
  const currentLeft = element.offsetLeft + (element.offsetWidth / 2);
  const currentTop = element.offsetTop + (element.offsetHeight / 2);
  console.log(currentLeft, currentTop)
  switch (type) {
    case "start":
      start.x = element.offsetLeft + (element.offsetWidth / 2);
      start.y = element.offsetTop + (element.offsetHeight / 2);
      //console.log(start);
      break;
    case "end":
      end.x = element.offsetLeft + (element.offsetWidth / 2);
      end.y = element.offsetTop + (element.offsetHeight / 2);
      //console.log(end);
      break;
    default:
      console.log("get position type error");
      break;
  };
};

export const updateMousePosition = (mouseEvent) => {
  mouse.x = mouseEvent.clientX;
  mouse.y = mouseEvent.clientY;
  //console.log(mouse);
  updateMouse();
};

const updateMouse = () => {
  // remove previous path
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) {
    tempPath.remove();
    // remove circle
    removeCircle("temp");
  }
  // get center point
  center.x = (mouse.x + start.x) / 2;
  center.y = (mouse.y + start.y) / 2 + 100;
  //add new path
  addTempPath();
  //console.log(start.x, center.x, mouse.x, end.x, request);
  cancelRequest();
  request = window.requestAnimationFrame(updateMouse);
};

export const createPath = (first, second) => {
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
      d="M${start.x},${start.y} Q${center.x},${center.y} ${end.x},${end.y}" 
      fill="none" 
      stroke="black" 
      stroke-width="3" 
    />`;
  const svg = document.querySelector("svg");
  svg.insertAdjacentHTML("beforeend", path);
  console.log(start, center, end)
  //console.log(first)
  resetTemp(firstNumber);
  pathClickHandler();
  addCircle(firstNumber, start.x, start.y);
  addCircle(secondNumber, end.x, end.y);
};

import { getNumber } from "../dragNdrop/dragUtils.js";
import { pathClickHandler } from "./linksHandlers.js";
import { addCircle, removeCircle } from "./components/circles.js";

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
    stroke-width="5" 
  />`;
  const svg = document.querySelector("svg");
  svg.insertAdjacentHTML("beforeend", path);
  addCircle('temp', start.x, start.y)
};

export const resetTemp = (firstNumber) => {
  cancelRequest();
  // reset temp
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) tempPath.remove();
  // remove circle
  removeCircle('temp');
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
  //console.log(mouse);
  updateMouse();
};

const cancelRequest = () => {
  window.cancelAnimationFrame(request);
};

const updateMouse = () => {
  // remove previous path
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) {
    tempPath.remove();
    // remove circle
    removeCircle('temp');
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
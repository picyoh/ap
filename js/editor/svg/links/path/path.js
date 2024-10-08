import { getNumber } from "../../../utils/getNumber/getNumber.js";
import { getPositions } from "../../../utils/position/getPosition.js";
import { addCircle, removeCircle } from "../circle/circle.js";
import { cancelRequest } from "../../../utils/mouse/mouse.js";

let start = { x: 0, y: 0 };
let center = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

export const setStart = (target) => {
  let pos = getPositions(target);
  start.x = pos.x;
  start.y = pos.y;
};

export const addTempPath = (mouse) => {
  // get center point
  center.x = (mouse.x + start.x) / 2;
  center.y = (mouse.y + start.y) / 2 + 100;
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

export const createPath = (first, second) => {
  // get end position
  const pos = getPositions(second);
  end.x = pos.x;
  end.y = pos.y;
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
  console.log(start, center, end);
  //console.log(first)
  resetTemp(firstNumber);
  addCircle(firstNumber, start.x, start.y);
  addCircle(secondNumber, end.x, end.y);
};

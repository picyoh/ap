import { getNumber } from "../../../utils/getNumber/getNumber.js";
import { getElementPositions } from "../../../utils/position/getPosition.js";
import { addCircle, removeCircle } from "../circle/circle.js";
import { cancelRequest } from "../../../utils/mouse/mouse.js";

let start = { x: 0, y: 0 };
let center = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

export const setStart = (target) => {
  let pos = getElementPositions(target);
  start.x = pos.x;
  start.y = pos.y;
};

const getCenter = (start, end) =>{
  center.x = (end.x + start.x) / 2;
  center.y = (end.y + start.y) / 2 + 100;
}

export const addTempPath = (mouse) => {
  // get center point
  getCenter(start, mouse);

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
  addCircle("temp", "temp", start.x, start.y);
};

export const resetTemp = () => {
  cancelRequest();
  // reset temp
  const tempPath = document.querySelector("#temp_path");
  if (tempPath) {
    // remove temp path
    tempPath.remove();
    // remove circle
    removeCircle("temp_temp");
  }
};

export const createPath = (linkBottom, linkTop, startIsTop) => {
  // get end position
  if(startIsTop){
    const pos = getElementPositions(linkBottom);
    end.x = pos.x;
    end.y = pos.y;
  }else{
    const pos = getElementPositions(linkTop);
    end.x = pos.x;
    end.y = pos.y;
  }
  // get link id number for circles
  const linkBottomNumber = getNumber(linkBottom.id);
  // get numbers and concatenate
  const linkBottomContNumber = getNumber(linkBottom.id, true);
  const linkTopNumber = getNumber(linkTop.id);
  const pathId = "path_" + linkBottomContNumber + "_" + linkTopNumber;
  // get center point
  getCenter(start, end);

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
  resetTemp();
  addCircle(linkBottomNumber, linkTopNumber, start.x, start.y);
  addCircle(linkTopNumber, linkBottomNumber, end.x, end.y);
};
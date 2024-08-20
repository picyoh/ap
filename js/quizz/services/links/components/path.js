import { resetTemp} from "../links.js";
import { pathClickHandler } from "../linksHandlers.js";
import { addCircle } from "./circles.js";

export const createPath= (first, second) => {
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
      stroke-width="5" 
    />`;
    const svg = document.querySelector("svg");
    svg.insertAdjacentHTML("beforeend", path);
    //console.log(start, center, end)
    resetTemp(firstNumber);
    pathClickHandler();
    addCircle(firstNumber, start.x, start.y);
    addCircle(secondNumber, end.x, end.y);
  };
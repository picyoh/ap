import { refreshPaths } from "../../svg/links/linkHandlers.js";
import { getRelativePosition } from "../../utils/position/getPosition.js";

// Drag start
export const dragStartHandler = (e) => {
  e.stopPropagation();
  let target;
  //console.log(e.target.parentNode.classList.contains('answer'))
  if(e.target.parentNode.classList.contains('answer')){
    target = e.target.parentNode.id;
  }else{
    target = e.target.closest('.containers').id;
  }
  e.dataTransfer.setData("text/plain", target);
  e.dataTransfer.effectAllowed = "move";
  //console.log(e.dataTransfer, target);
};

// Drag over
export const dragOverHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "move";
};

export const dropHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const data = e.dataTransfer.getData("text/plain");
  const dataDom = document.getElementById(data);
  //console.log(dataDom)
  if (dataDom === null) return;
  if(dataDom.classList.contains('containers')){
    const pos = getRelativePosition(e);
    dataDom.style.left = `${pos.x}px`;
    dataDom.style.top = `${pos.y}px`;
  }
  if(dataDom.classList.contains('answer')){
    //TODO: drop answer
    //get node value
    //create new answer in targeted container
    //set node value
  }
  refreshPaths();
};

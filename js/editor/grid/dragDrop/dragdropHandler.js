import { dragStartHandler, dragOverHandler } from "./dragdrop.js";
import { dropHandler } from "./dragdrop.js";

export const dragDropHandler = () => {
  // get draggable elements
  const grips = document.querySelectorAll("[draggable]");
  grips.forEach((grip) => {
    // trigger event
    grip.addEventListener("dragstart", (e) => {
      dragStartHandler(e);
      dropTrigger(e.target)
    });
  });
};

export const dropTrigger = (dragged) => {
  
  const parentNodeClassList = dragged.parentNode.classList;
  let dropZone = '';
  if(dragged.classList.contains("containers") || parentNodeClassList.contains('containers')){
    dropZone = '#wrapper';
  }else if(parentNodeClassList.contains("answer")){
    dropZone = '.containers';
  }
  // get targets
  const targets = document.querySelectorAll(`${dropZone}`);
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

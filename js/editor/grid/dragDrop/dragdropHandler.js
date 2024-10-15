import { dragStartHandler, dragOverHandler } from "./dragdrop.js";
import { dropHandler } from "./dragdrop.js";

export const dragDropHandler = () => {
  // get draggable elements
  const grips = document.querySelectorAll("[draggable]");
  grips.forEach((grip) => {
    // trigger event
    grip.addEventListener("dragstart", (e) => {
      dragStartHandler(e);
      dropTrigger(e.target);
    });
  });
};

export const dropTrigger = (dragged) => {
  const parentNodeClassList = dragged.parentNode.classList;
  let dropZone = "";
  switch (true) {
    case parentNodeClassList.contains("groups"):
    case parentNodeClassList.contains("containers"):
      dropZone = "#wrapper";
      break;
    case parentNodeClassList.contains("answer"):
      dropZone = ".containers";
      break;
    default:
      console.log("drop Trigger failed");
      break;
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

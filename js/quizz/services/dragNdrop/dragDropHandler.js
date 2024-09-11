import {dragStartHandler, dragOverHandler} from "./drag.js"
import {dropHandler} from "./drop.js"

export const dragDropHandler = () => {
    // get draggable elements
    const draggables = document.querySelectorAll("[draggable]");
    //console.log(draggables);
    draggables.forEach((draggable) => {
      // trigger event
      draggable.addEventListener("dragstart", (e) => {
        dragStartHandler(e);
      });
    });
    // get targets
    const targets = document.querySelectorAll("[data-drop-target]");
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
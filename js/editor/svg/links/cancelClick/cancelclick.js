import { resetTemp } from "../path/path.js";
import { mouseMoveTrigger } from "../../../utils/mouse/mouse.js";
import { linkablesHandler } from "../links.js";

export const cancelClickTrigger = (onDrag) => {
  const body = document.querySelector("body");
  if (onDrag) {
    body.addEventListener("click", cancelClick, false);
  } else {
    body.removeEventListener("click", cancelClick, false);
  }
};

const cancelClick = (e) => {
  //console.log(e.target);
  e.stopPropagation();
  if (!e.target.classList.contains("links")) {
    resetTemp();
    mouseMoveTrigger(false);
    //linkablesHandler();
  }
};

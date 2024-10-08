import { removeCircle } from "../../svg/links/circle/circle.js";
import { addTempPath } from "../../svg/links/path/path.js";

let mouse = { x: 0, y: 0 };
let request;

export const mouseMoveTrigger = (onDrag) => {
  if (onDrag) {
    window.addEventListener("mousemove", updateMousePosition, false);
  } else {
    window.removeEventListener("mousemove", updateMousePosition, false);
  }
};

const updateMousePosition = (e) => {
  const wrapper = document.querySelector('#wrapper').getBoundingClientRect();
  mouse.x = e.pageX - wrapper.left;
  mouse.y = e.pageY - wrapper.top;
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
  //add new path
  addTempPath(mouse);
  //console.log(start.x, center.x, mouse.x, end.x, request);
  cancelRequest();
  request = window.requestAnimationFrame(updateMouse);
};

export const cancelRequest = () => {
  window.cancelAnimationFrame(request);
};

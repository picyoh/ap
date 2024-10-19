import { refreshPaths } from "../../svg/links/linkHandlers.js";
import { getRelativePosition } from "../../utils/position/getPosition.js";

// Drag start
export const dragStartHandler = (e) => {
  e.stopPropagation();
  let target;
  const parentNodeClassList = e.target.parentNode.classList;
  switch (true) {
    case parentNodeClassList.contains("answer"):
      target = e.target.parentNode.id;
      break;
    case parentNodeClassList.contains("containers"):
      target = e.target.closest(".containers").id;
      break;
    case parentNodeClassList.contains("groups"):
      target = e.target.closest(".groups").id;
      break;
    default:
      console.log("dragStart handler fail");
      break;
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
  //console.log(dataDom, e.target)
  switch (true) {
    case dataDom.classList.contains("answer"):
      const target = e.target;
      const clone = dataDom.cloneNode(true);
      target.appendChild(clone);
      dataDom.remove();
      break;
    case dataDom.classList.contains("containers"):
      if(e.target.classList.contains('group_content')){
        const target = e.target;
        const clone = dataDom.cloneNode(true);
        clone.style.top = 0;
        clone.style.left = 0;
        target.appendChild(clone);
        dataDom.remove();
      }else {
        const pos = getRelativePosition(e);
        dataDom.style.left = `${pos.x}px`;
        dataDom.style.top = `${pos.y}px`;
      }
      break;
    case dataDom.classList.contains("groups"):
      const pos = getRelativePosition(e);
      dataDom.style.left = `${pos.x}px`;
      dataDom.style.top = `${pos.y}px`;
      break;
    default:
      console.log("drop handler failed");
      break;
  }
  refreshPaths();
};

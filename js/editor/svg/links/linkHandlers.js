import { resetHandlers } from "../../handlers.js";
import { mouseMoveTrigger } from "../../utils/mouse/mouse.js";
import { getElementPositions, getRelativePosition } from "../../utils/position/getPosition.js";
import { setStart, createPath } from "./path/path.js";
import { cancelClickTrigger } from "./cancelClick/cancelclick.js";
import { addParentValue } from "./addParentValue/addParentValue.js";
import { hightlightHandler } from "./highlight/highlight.js";

let onDrag = false;
let startDom;
//TODO: refresh links when a container move
export const linksHandler = () => {
  const links = document.querySelectorAll(".link_circle");
  links.forEach(
    (link) => {
      link.addEventListener("click", (e) => {
        if (e.target.classList.contains("linked")) {
          //TODO: unlink
        } else {
          e.target.classList.add("linked");
          beginLinkHandler(e);
        }
      },
      { once: true });
    }
  );
};

const beginLinkHandler = (e) => {
  if(onDrag === false){
    e.stopPropagation();
    onDrag = true;
    // trigger cursor path animation
    mouseMoveTrigger(onDrag);
    // set starting point
    startDom = e.target;
    // set starting positions
    setStart(e.target);
    // trigger cancel by clicking
    cancelClickTrigger(onDrag);
    // get compatibility
    const linkTop = e.target.classList.contains("link_top");
    // trigger end
    if (linkTop) {
      endLinkTrigger("link_bottom");
    } else {
      endLinkTrigger("link_top");
    }
  }
};

const endLinkTrigger = (endLink) => {
  const linkables = document.querySelectorAll(`.${endLink}`);
  linkables.forEach((linkable) => {
    linkable.addEventListener(
      "click",
      (e) => {
        endLinkHandler(e);
      },
      { once: true }
    );
  });
};

const endLinkHandler = (e) => {
  e.stopPropagation();
  const startIsTop = startDom.classList.contains('link_top');
  const linkTop = startIsTop ? startDom : e.target;
  const linkBottom = startIsTop ? e.target : startDom;
  // create canvas link
  createPath(linkBottom, linkTop, startIsTop);
  // add parent value
  //TODO: adjust addParentValue wth top and bottom (bottom is always the parent)
  addParentValue(startDom, e.target);
  //reinit triggers
  linkablesHandler();
  //console.log(startDom.id, e.target.id);
};

export const linkablesHandler = () => {
  onDrag = false;
  resetHandlers();
  // end cursor animation
  mouseMoveTrigger(onDrag);
  cancelClickTrigger(onDrag);
  hightlightHandler();
  refreshPaths();
};

export const refreshPaths = () =>{
const paths = document.querySelectorAll('.paths');
paths.forEach((path)=>{
  const contNumber = path.id.split('_');
  // remove 
  path.remove();
  document.querySelector(`#circle_${contNumber[1]}_${contNumber[2]}`).remove();
  document.querySelector(`#circle_${contNumber[2]}_${contNumber[1]}`).remove();
  // update
  const linkBottom = document.querySelector(`#link_${contNumber[1]}`);
  const linkTop = document.querySelector(`#link_${contNumber[2]}`);
  console.log(linkBottom, linkTop);
  createPath(linkBottom, linkTop, false);
})
};
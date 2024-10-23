import { resetHandlers } from "../../handlers.js";
import { mouseMoveTrigger } from "../../utils/mouse/mouse.js";
import { getElementPositions, getRelativePosition } from "../../utils/position/getPosition.js";
import { setStart, createPath } from "./path/path.js";
import { cancelClickTrigger } from "./cancelClick/cancelclick.js";
import { addParentValue } from "./addParentValue/addParentValue.js";
import { hightlightHandler } from "./highlight/highlight.js";
import { removeCircle } from "./circle/circle.js";

let onDrag = false;
let startDom;
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
  console.log(endLink)
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
  const startFromTop = startDom.classList.contains('link_top');
  const linkTop = startFromTop ? startDom : e.target;
  const linkBottom = startFromTop ? e.target : startDom;
  // create canvas link
  createPath(linkBottom, linkTop, startFromTop);
  // add parent value
  addParentValue(linkBottom, linkTop);
  //reinit triggers
  linkablesHandler();
  console.log(startDom.id, e.target.id);
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
  const splitId = path.id.split('_');
  console.log(path.id, splitId)
  const answerNumber = `${splitId[1].replaceAll('-', '_')}`;
  const contNumber = `${splitId[2].replace('-', '_')}`;
  // remove 
  path.remove();
  console.log(answerNumber, contNumber)
  removeCircle(`${splitId[1]}_${splitId[2]}`);
  removeCircle(`${splitId[2]}_${splitId[1]}`);
  // update
  const linkBottom = document.querySelector(`#link_${answerNumber}`);
  const linkTop = document.querySelector(`#link_${contNumber}`);
  createPath(linkBottom, linkTop, false);
})
};
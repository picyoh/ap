import { resetHandlers } from "../../handlers.js";
import { mouseMoveTrigger } from "../../utils/mouse/mouse.js";
import { getPositions } from "../../utils/position/getPosition.js";
import { setStart, createPath } from "./path/path.js";
import { cancelClickTrigger } from "./cancelClick/cancelclick.js";
import { addParentValue } from "./addParentValue/addParentValue.js";
import { hightlightHandler } from "./highlight/highlight.js";

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
  // create canvas link
  createPath(startDom, e.target);
  // add parent value
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
};

export const hideLinkHandler = () => {
  const btn = document.querySelector("#hide_links");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //TODO: toogle class instead of :
    const svgDom = document.querySelector("svg");
    if (svgDom.classList.contains("none")) {
      svgDom.classList.remove("none");
    } else {
      svgDom.classList.add("none");
    }
  });
};

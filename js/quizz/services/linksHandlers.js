import {
  createLink,
  updateMousePosition,
  getPositions,
  resetTemp,
} from "./links.js";
import { addParentValue } from "./links.js";

let onDrag = false;
let dragged;

const linkableTrigger = (dragged) => {
  const linkables = document.querySelectorAll("[linkable]");
  linkables.forEach((linkable) => {
    linkable.addEventListener(
      "click",
      (e) => {
        endClickHandler(dragged, e);
      },
      { once: true }
    );
  });
};

const linkTargetTrigger = (dragged) => {
  const linkables = document.querySelectorAll("[link-target]");
  linkables.forEach((linkable) => {
    linkable.addEventListener(
      "click",
      (e) => {
        endClickHandler(dragged, e);
      },
      { once: true }
    );
  });
};

const beginClickHandler = (e) => {
  e.stopPropagation();
  onDrag = true;
  // add clicked class
  e.target.classList.add("clicked");
  // trigger cursor animation
  mouseMoveTrigger();
  // trigger linkable click
  const linkable = e.target.hasAttribute("linkable");
  dragged = e.target;
  getPositions(e.target, "start");
  resetLinkTrigger();
  cancelClickTrigger(dragged);
  if (linkable) {
    linkTargetTrigger(dragged);
  } else {
    linkableTrigger(dragged);
  }
};

const endClickHandler = (dragged, e) => {
  e.stopPropagation();
  onDrag = false;
  // add clicked class
  e.target.classList.add("clicked");
  // end cursor animation
  mouseMoveTrigger();
  // get end position
  getPositions(e.target, "end");
  // create canvas link
  createLink(dragged, e.target);
  // add parent value
  addParentValue(dragged, e.target);
  //reinit triggers
  linkablesHandler();
  //console.log(dragged.id, e.target.id);
};

const initTrigger = () => {
  // get links
  const links = document.querySelectorAll(".link");
  links.forEach((link) => {
    // trigger click event
    link.addEventListener(
      "click",
      (e) => {
        beginClickHandler(e);
      },
      { once: true }
    );
  });
};

const cancelClick = (e) => {
  e.stopPropagation();
  if (!e.target.classList.contains("link")) {
    onDrag = false;
    mouseMoveTrigger();
    linkablesHandler();
    removeClickedClass(dragged.id);
  }
};

const removeClickedClass = (elementId) => {
  const element = document.getElementById(elementId);
  //console.log(elementId.split('_')[0])
  const isAnswer = elementId.split('_')[0] === 'answer' ? true : false;
  // get parent value
  const parentValue =
    element.parentNode.querySelector("input[type=hidden]").value;
  //console.log(parentValue);
  if (!parentValue && !isAnswer) {
    element.classList.remove("clicked");
  }
};

const cancelClickTrigger = (dragged) => {
  const body = document.querySelector("body");
  if (onDrag) {
    body.addEventListener("click", cancelClick, false);
  } else {
    body.removeEventListener("click", cancelClick, false);
  }
};

const mouseMoveTrigger = () => {
  if (onDrag) {
    window.addEventListener("mousemove", updateMouse, false);
  } else {
    window.removeEventListener("mousemove", updateMouse, false);
  }
};

const updateMouse = (e) => {
  updateMousePosition(e);
};

const resetLinkTrigger = () => {
  // get links
  const links = document.querySelectorAll(".link");
  // reset event listeners
  links.forEach((link) => {
    link.replaceWith(link.cloneNode(true));
  });
};

export const linkablesHandler = () => {
  resetLinkTrigger();
  initTrigger();
};

import { updateMousePosition, getPositions, resetTemp } from "./path.js";
import { createPath } from "./path.js";
import { removeCircle } from "./components/circles.js";
import { addParentValue } from "./parentHandler.js";

let onDrag = false;
let dragged;

const linkableTrigger = () => {
  const linkables = document.querySelectorAll("[linkable]");
  linkables.forEach((linkable) => {
    linkable.addEventListener(
      "click",
      (e) => {
        endClickHandler(e);
      },
      { once: true }
    );
  });
};

const linkTargetTrigger = () => {
  const linkables = document.querySelectorAll("[link-target]");
  linkables.forEach((linkable) => {
    linkable.addEventListener(
      "click",
      (e) => {
        endClickHandler(e);
      },
      { once: true }
    );
  });
};

const beginClickHandler = (e) => {
  e.stopPropagation();
  onDrag = true;
  // trigger cursor animation
  mouseMoveTrigger();
  // trigger linkable click
  const linkable = e.target.hasAttribute("linkable");
  dragged = e.target;
  getPositions(e.target, "start");
  resetLinkTrigger();
  cancelClickTrigger();
  if (linkable) {
    linkTargetTrigger();
  } else {
    linkableTrigger();
  }
};

const endClickHandler = (e) => {
  e.stopPropagation();
  onDrag = false;
  // end cursor animation
  mouseMoveTrigger();
  // get end position
  getPositions(e.target, "end");
  // create canvas link
  createPath(dragged, e.target);
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
  console.log(e.target);
  e.stopPropagation();
  if (!e.target.classList.contains("link")) {
    onDrag = false;
    resetTemp();
    mouseMoveTrigger();
    linkablesHandler();
  }
};

const cancelClickTrigger = () => {
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
  cancelClickTrigger();
  initTrigger();
  hightlightHandler();
};

export const pathClickHandler = () => {
  const paths = document.querySelectorAll(".paths");
  paths.forEach((path) => {
    path.addEventListener("click", (e) => {
      const split = path.id.split("_");
      const answerId = "answer_link_" + split[1];
      document.getElementById(answerId).click();
      path.remove();
      removeCircle(split[1]);
      removeCircle(split[2]);
    });
  });
};

const hightlightHandler = () => {
  const paths = document.querySelectorAll(".paths");
  paths.forEach((path) => {
    path.addEventListener("mouseover", (e) => {
      e.target.classList.add("highlightedPaths");
      highlightParentPath(e.target.id, true);
    });
    path.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("highlightedPaths");
      highlightParentPath(e.target.id, false);
    });
  });
};

const highlightParentPath = (targetId, isOver) => {
  //console.log(targetId)
  const split = targetId.split("_");
  // get answer
  const answerNumber = split[1];
  // get parent question value
  const questionNumber = answerNumber.slice(0, 3);
  const questionParent = "question_parent_" + questionNumber;
  const parentValue = document.getElementById(questionParent).value;
  if (parentValue) {
    const splitNumber = parentValue.split("_")[1];
    const pathId = "path_" + splitNumber + "_" + questionNumber;
    //console.log(pathId);
    if (isOver) {
      document.getElementById(pathId).classList.add("highlightedPaths");
    } else {
      document.getElementById(pathId).classList.remove("highlightedPaths");
    }
    highlightParentPath(pathId, isOver);
  }
};

export const hideLinkHandler = () => {
  const btn = document.querySelector("#hide_links");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const svgDom = document.querySelector("svg");
    if (svgDom.classList.contains("none")) {
      svgDom.classList.remove("none");
    } else {
      svgDom.classList.add("none");
    }
  });
};

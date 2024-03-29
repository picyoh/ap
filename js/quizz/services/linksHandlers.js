import { createLink } from "./links.js";
import { addParentValue } from "./links.js";

const linkStartHandler = (e) => {
  e.stopPropagation();
  e.dataTransfer.clearData();
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.effectAllowed = "link";
  //console.log(e.target.id, e.dataTransfer);
};

const linkEnterHandler = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  e.dataTransfer.dropEffect = "link";
  //console.log("data : " + data + "edata : " + e.dataTransfer.types);
};

const linkOverHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "link";
};

const linkDrop = (e) => {
  e.stopPropagation();
  const dataDom = document.getElementById(e.dataTransfer.getData('text/plain'));
  addParentValue(dataDom, e.target);
  createLink(dataDom, e.target);
};

export const linkablesHandler = () => {
  const linkables = document.querySelectorAll("[linkable]");
  linkables.forEach((linkable) => {
    linkable.addEventListener("dragstart", (e) => {
      linkStartHandler(e);
    });
  });
  const linkTargets = document.querySelectorAll("[link-target]");
  linkTargets.forEach((linkTarget) => {
    linkTarget.addEventListener("dragenter", (e) => {
      linkEnterHandler(e);
    });
    linkTarget.addEventListener("dragover", (e) => {
      linkOverHandler(e);
    });
    linkTarget.addEventListener("drop", (e) => {
      linkDrop(e);
    });
  });
};

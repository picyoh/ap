import { createLink } from "./links.js";

const getNumber = (target) => {
    console.log(target)
  const targetSplit = target.split('_');
  const targetSplitLast = targetSplit.length -1;
  const targetNumber = targetSplit[targetSplitLast];
  return targetNumber;
}

const addParentValue = (start, target) => {
  // get Numbers in arrays
  const startNumber = getNumber(start.id)
  const targetNumber = getNumber(target)
  console.log(startNumber, targetNumber)
  // Compare
  // question cases
  let child =
    startNumber.length === 2 ? start : targetNumber.length === 2 ? target : "";
  // answers cases
  if (child === "") {
    // get lower answer id
    for (let i = 0; i < 3; i++) {
      //console.log(startNumber[i], targetNumber[i]);
      if (startNumber[i] !== targetNumber[i]) {
        startNumber[i] > targetNumber[i] ? (child = start) : (child = target);
        break;
      }
    }
  }
  const parent = target === child ? start : target;
  console.log(child, child.parentNode);
  child.parentNode.querySelector("input[type=hidden]").value = parent.id;
  //console.log("child : " + child.id + " parent : " + parent.id);
};

const checkLinkable = (start, target) => {
    //TODO: control links (answer -> question) + control parents (answer.parent !== question)
    //console.log(start, target)
    return true;
  };

const linkStartHandler = (e) => {
  e.stopImmediatePropagation();
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
  e.stopImmediatePropagation();
  e.dataTransfer.dropEffect = "link";
};

const linkDrop = (e) => {
    e.stopImmediatePropagation();
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

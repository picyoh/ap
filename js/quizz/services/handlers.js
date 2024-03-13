import { addRow, addContainer } from "../components/form.js";
import { addAnswer } from "../components/answer.js";
import { formToJson } from "../services/generator.js";
import { dragDropHandler } from "./dragdrop.js";
import { linkablesHandler } from "./linksHandlers.js";

const addRowHandler = () => {
  const addRowBtns = document.querySelectorAll(".add_row");
  addRowBtns.forEach((addRowBtn, index) => {
    addRowBtn.addEventListener(
      "click",
      (e) => {
        //console.log(e.target.className, index);
        addRow(index + 1);
      },
      { once: true }
    );
  });
};

export const addContainerHandler = () => {
  const addContainerBtns = document.querySelectorAll(".add_container");
  addContainerBtns.forEach((addContainerBtn) => {
    addContainerBtn.addEventListener(
      "click",
      (e) => {
        const parent = e.target.parentNode.parentNode.parentNode;
        //console.log(parent);
        addContainer(parent);
      },
      { once: true }
    );
  });
};

const addAnswerHandler = () => {
  const addAnswerBtns = document.querySelectorAll(".add_answer");
  addAnswerBtns.forEach((addAnswerBtn) => {
    addAnswerBtn.addEventListener(
      "click",
      (e) => {
        const parent = e.target.parentNode.parentNode.parentNode;
        const group = e.target.parentNode;
        //console.log(parent, group)
        addAnswer(parent, group);
      },
      { once: true }
    );
  });
};

export const submitHandler = () => {
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    formToJson(e.target.parentNode);
  });
};

const preventDragOnRange = () => {
  const ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach((range) => {
    range.addEventListener("mouseenter", (e) => {
      e.target.parentNode.setAttribute("draggable", false);
    });
    range.addEventListener("mouseleave", (e) => {
      e.target.parentNode.setAttribute("draggable", true);
    });
  });
};

const removeListeners = () => {
  const addRowBtns = document.querySelectorAll(".add_row");
  addRowBtns.forEach((addRowBtn) => {
    addRowBtn.replaceWith(addRowBtn.cloneNode(true));
  });
  const addContainerBtns = document.querySelectorAll(".add_container");
  addContainerBtns.forEach((addContainerBtn) => {
    addContainerBtn.replaceWith(addContainerBtn.cloneNode(true));
  });
  const addAnswerBtns = document.querySelectorAll(".add_answer");
  addAnswerBtns.forEach((addAnswerBtn) => {
    addAnswerBtn.replaceWith(addAnswerBtn.cloneNode(true));
  });
  //TODO: reset drag and drop ?
  const linkables = document.querySelectorAll("[linkable]");
  linkables.forEach((linkable)=>{
    linkable.replaceWith(linkable.cloneNode(true));
  });
};

export const handlers = () => {
  removeListeners();
  addRowHandler();
  addContainerHandler();
  addAnswerHandler();
  dragDropHandler();
  linkablesHandler();
  preventDragOnRange();
};

import { addRow, addContainer } from "../components/quizzForm.js";
import { addAnswer } from "../components/answer.js";
import { quizzToJson } from "./quizzGenerator.js";
import { resultToJson } from "../../results/services/resultGenerator.js";
import { linkablesHandler } from "./links/linksHandlers.js";
import { addTagsToResults } from "../../results/components/tags.js";
import { dragDropHandler } from "./dragNdrop/dragdrop.js";
/* import { pathHandler } from "./links.js"; */

const addRowHandler = () => {
  const addRowBtns = document.querySelectorAll(".add_row");
  addRowBtns.forEach((addRowBtn) => {
    addRowBtn.addEventListener(
      "click",
      (e) => {
        const rowNumber = parseInt(e.target.parentNode.parentNode.children.length)
        addRow(rowNumber);
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
        // get Id
        const targetId = parseInt(e.target.id);
        // empty ids are not at row level
        const rowLevel = targetId > 0;
        // get parent
        const parent = rowLevel ? e.target.parentNode.parentNode : e.target.parentNode.parentNode.parentNode;
        // get group
        const group = e.target.parentNode;
        //console.log(parent, group, targetId, rowLevel)
        addAnswer(parent, group, targetId);
      },
      { once: true }
    );
  });
};

export const submitHandler = () => {
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentNode)
    quizzToJson(e.target.parentNode);
  });
};

export const submitHandlerResult = () => {
  const submit = document.querySelector("#submitResult");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentNode)
    resultToJson(e.target.parentNode);
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
  const draggables = document.querySelectorAll("[draggable]");
  draggables.forEach((draggable)=>{
    draggable.replaceWith(draggable.cloneNode(true));
  });
  const paths = document.querySelectorAll(".paths");
  paths.forEach((path) => {
    path.replaceWith(path.cloneNode(true));
  });
  const tags = document.querySelectorAll(".tags");
  tags.forEach((tag) => {
    tag.replaceWith(tag.cloneNode(true));
  });
  const tagsAreas = document.querySelectorAll(".tags__area");
  tagsAreas.forEach((area) => {
    area.replaceWith(area.cloneNode(true));
  });
  const result_tags = document.querySelectorAll(".result__tag");
  result_tags.forEach((result) => {
    result.replaceWith(result.cloneNode(true));
  });
};

export const handlers = () => {
  removeListeners();
  addRowHandler();
  addContainerHandler();
  addAnswerHandler();
  dragDropHandler();
  linkablesHandler();
  addTagsToResults();
  preventDragOnRange();
  autoFillTag();
};

const autoFillTag = () => {
  const answers = document.querySelectorAll('.answer_inputs');
  answers.forEach((answer)=>{
    answer.addEventListener('change', (e)=>{
      // get id
      const answerId = e.target.id;
      const tagId = answerId.replace('input', 'tag');
      // get value
      const answerValue = e.target.value;
      const tagValue = answerValue.toLowerCase().slice(0,20).replaceAll(' ', '_');
      
      const tagDom = document.getElementById(tagId);
      tagDom.value = tagValue;
      
    });
  })
}
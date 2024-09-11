import { addRowHandler } from "../components/row/rowHandler.js";
import { addContainerHandler } from "./../components/container/containerHandler.js";
import { addAnswerHandler } from "./../components/answer/answerHandler.js";
import { dragDropHandler } from "./dragNdrop/dragDropHandler.js";
import { linkablesHandler } from "./paths/linksHandlers.js";
import { checkTagHandler} from "../../results/components/tags/checkTagHandler.js";
import { autoFillTag } from "../../results/components/tags/autofillTags.js";
import { preventDrag } from "./dragNdrop/preventDrag.js";
import { pathHandler } from "./paths/pathHandler.js";
import { svgWindowHandler } from "./paths/components/svg.js";


export const handlers = () => {
  removeListeners();
  addRowHandler();
  addContainerHandler();
  addAnswerHandler();
  dragDropHandler();
  linkablesHandler();
  checkTagHandler();
  pathHandler();
  svgWindowHandler();
  preventDrag();
  autoFillTag();
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
  draggables.forEach((draggable) => {
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

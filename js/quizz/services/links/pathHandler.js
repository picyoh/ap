import { getPositions } from "./links";
import { createPath } from "./paths.js";

//TODO: checker pour mise a jour reguliere des paths et cercles
export const pathHandler = () => {
    const paths = document.querySelectorAll(".paths");
    paths.forEach((path) => {
      updatePath(path.id);
    });
  };
  
  export const updatePath = (pathId) => {
    // split canvas Id
    const split = pathId.split("_");
    const first = split[1];
    const second = split[2];
    // get links ids
    const firstId =
      first.length === 3
        ? "question_link_" + first
        : first.length === 5
        ? "answer_link_" + first
        : "";
    const secondId =
      second.length === 3
        ? "question_link_" + second
        : second.length === 5
        ? "answer_link_" + second
        : "";
    console.log(firstId, secondId);
    // get links elements
    const firstElement = document.getElementById(firstId);
    const secondElement = document.getElementById(secondId);
    // get positions
    getPositions(firstElement, "start");
    getPositions(secondElement, "end");
    // delete previous links
    document.getElementById(pathId).remove();
    //console.log(pathId);
    // re generate link
    createPath(firstElement, secondElement);
  };
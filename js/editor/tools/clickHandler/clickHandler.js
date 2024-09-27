import { addQuestion } from "./question/question.js"

export const clickHandler = (label) => {
  const emptys = document.querySelectorAll(".empty_container");
  emptys.forEach((container) => {
    container.addEventListener("click", (e) => {
      const split = e.target.id.split("container_");
      const number = split[1];
      switch (label) {
        case "question":
          addQuestion(number, e.target);
          break;
        case "answer":
          addAnswer(number, e.target);
          break;
        case "result":
          addResult(number, e.target);
          break;
        default:
          console.log("tools clickHandler failed");
          break;
      }
    });
  });
};


export const getContainerNumber = () =>{
    const containers = document.querySelectorAll('.container')
}
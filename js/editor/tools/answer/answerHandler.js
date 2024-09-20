import { addAnswer } from "./answer.js";

export const addAnswerHandler = () => {
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
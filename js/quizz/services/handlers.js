import { questionCheckbox } from "../components/questions.js";
import { answerContent } from "../components/answers.js";
import { newMultiple, newQuestion, newSimple, addAnswer, addQuestion } from "../services/generator.js";

export const handleAddAnswer = () => {
  const addAnswerBtns = document.querySelectorAll(
    ".generator__question__addAnswer"
  );
  addAnswerBtns.forEach((addAnswerBtn) => {
    addAnswerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log(e.target.previousSibling.previousSibling)
      const answer = e.target;
      const targetQuestion = getNumber(e.target.id);

      const nextAnswer = Number(targetQuestion[2]) + 1;
      console.log(targetQuestion, nextAnswer, )
      addAnswer(targetQuestion[0], targetQuestion[1], nextAnswer);
    });
  });
};

export const handleAddMulti = () => {

  const addMultiBtns = document.querySelectorAll(".generator__question__addMulti");
  addMultiBtns.forEach((addMultiBtn) => {
    console.log("addMulti")
    addMultiBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      addQuestion();
    });
  });
};

export const handleAddQuestion = () => {

  const addQuestionBtns = document.querySelectorAll(
    ".generator__question__addQuestion"
  );
  addQuestionBtns.forEach((addQuestionBtn) => {
    addQuestionBtn.addEventListener("click", (e) => {
      console.log("addQuestion")
      e.preventDefault();
      e.stopImmediatePropagation();
      newQuestion();
    });
  });
};

export const handleCheckbox = () => {
  const checkbox = document.querySelector("input[name=checkbox_multi]");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      if(e.target.checked){
        newMultiple();
      }else{
        newSimple();
      }
    } 
  });
};

export const handleSimple = () => {
  handleAddQuestion();
  handleAddAnswer();
};

export const handleMultiple = () => {
  handleAddQuestion();
  handleAddMulti();
  handleAddAnswer();
};

const getNumber = (target) => {
  const ts = target.split("__")
console.log(target);
return [ts[2], ts[3], ts[4]];
};

const getContainer = () => {
                                     
}
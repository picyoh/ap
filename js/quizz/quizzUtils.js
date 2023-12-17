import { newAnswer, newQuestion } from "./quizz.js";

const handleAddAnswer = () => {
  const addAnswerBtns = document.querySelectorAll(
    ".generator__question__addAnswer"
  );
  addAnswerBtns.forEach((addAnswerBtn, index) => {
    addAnswerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      newAnswer(index);
    });
  });
};

const handleAddQuestion = () => {
  const addQuestionBtns = document.querySelectorAll(
    ".generator__question__addQuestion"
  );
  addQuestionBtns.forEach((addQuestionBtn) => {
    addQuestionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      newQuestion();
    });
  });
};

export const handleQuizz = () => {
  handleAddQuestion();
  handleAddAnswer();
};

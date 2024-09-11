import { checkTag } from "./checkTag.js";

export const autoFillTag = () => {
  const answers = document.querySelectorAll(".answer_inputs");
  answers.forEach((answer) => {
    answer.addEventListener("change", (e) => {
      // get id
      const answerId = e.target.id;
      const tagId = answerId.replace("input", "tag");
      // get value
      const answerValue = e.target.value;
      // normalize value
      const tagValue = answerValue
        .toLowerCase()
        .slice(0, 20)
        .replaceAll(" ", "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      //get DOM
      const tagDom = document.getElementById(tagId);
      // set value if empty
      if (tagDom.value === "") {
        tagDom.value = tagValue;
        checkTag(tagDom);
      }
    });
  });
};

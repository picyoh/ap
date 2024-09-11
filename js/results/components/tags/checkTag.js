import { handlers } from "../../../quizz/services/handlers.js";

export const checkTag = (target) => {
  // remove old tag if value is empty
  if(target.value === '') return removeTags();
  // get target type
  const targetType = target.classList.value;
  // get all tag nodes and their container
  let tags;
  let container;
  if (targetType === "answer_tag") {
    tags = document.querySelectorAll(".tag");
    container = ".tags__container";
  }
  if (targetType === "tags__area") {
    tags = document.querySelectorAll(".result__tag");
    container = ".tags__area";
  }
  // get ids list
  const tagsArray = Array.from(tags, (node) => node.id);

  for (let i = 1; i < 100; i++) {
    let suff = "";
    // add suffix if value already exist
    if (i > 1) suff = "_" + i;
    // concat
    const suffValue = target.value + suff;
    // check on tag list
    if (!tagsArray.includes(suffValue)) {
      // modify target value
      target.value = suffValue;
      // add tag and retrigger handlers
      addTag(container, target.value);
      handlers();
      break;
    }
  }
};
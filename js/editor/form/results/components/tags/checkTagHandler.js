import { checkTag } from "./checkTag.js";

export const checkTagHandler = () => {
    const tags = document.querySelectorAll(".answer_tag");
    tags.forEach((tag) => {
      tag.addEventListener(
        "change",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          checkTag(e.target);
        },
        { once: true }
      );
    });
  };
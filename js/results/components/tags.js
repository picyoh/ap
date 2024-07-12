import { handlers } from "../../quizz/services/handlers.js";

export const initCloud = () => {
  const cloud = `
      <div class='tags__container'>
          <p class='result__tag' id='empty_tag'>empty</p>
      </div>
      `;
  const tags = document.querySelector("#tags");
  tags.insertAdjacentHTML("beforeend", cloud);
};

export const addTagsToResults = () => {
  const tags = document.querySelectorAll(".answer_tag");
  tags.forEach((tag) => {
    tag.addEventListener(
      "change",
      (e) => {
        checkTag(e.target, e.target.value);
      },
      { once: true }
    );
  });
};

export const checkTag = (target, value) => {
  const targetType = target.classList.value;
  //console.log(target, value, targetType);
  let tags;
  let container;
  if (targetType === "answer_tag") {
    tags = document.querySelectorAll(".result__tag");
    container = ".tags__container";

  }
  if (targetType === "tags__area") {
    tags = document.querySelectorAll(".tags__area");
    container = ".tags__area";
  }
  // get ids array
  const tagsArray = Array.from(tags, (node) => node.id);
  // remove first
  const removefirst = tagsArray.includes("empty_tag");
  if (removefirst) {
    document.querySelector("#empty_tag").remove();
  }
  // check if tag is included
  const included = tagsArray.includes(value);
  //console.log(tags, container, included)
  if (!included) {
    addTag(container, value);
    handlers();
  } else {
    target.style.border = "1px solid red";
    target.style.backgroundColor = "mistyrose";
  }
  if (targetType === "answer_tag") {
    removeTags();
  }
};

export const addTag = (containerClass, value) => {
  const container = document.querySelector(containerClass);
  //console.log(containerClass, value)
  let tag;
  if(containerClass === '.tags__container'){
    tag = `<div class='tag' id='${value}' draggable='true'>${value}</div>`
  }
  if(containerClass === '.tags__area'){
    tag = `<div class='result__tag' id='result__${value}' draggable='true'>${value}</div>`;
  }
  container.insertAdjacentHTML("beforeend", tag);
  handlers()
};

const removeTags = () => {
  // comparing tag container and answer tags values
  const answerTags = document.querySelectorAll('.answer_tag');
  const ansTagArray = Array.from(answerTags, (node) => node.value);
  const tags = document.querySelectorAll('.result__tag');
  const tagsArray = Array.from(tags, (node) => node.id);
  tagsArray.forEach((tag) => {
    if (!ansTagArray.includes(tag)) {
      const tagId = '#' +tag;
      document.getElementById(tag).remove()
    }
  });
};

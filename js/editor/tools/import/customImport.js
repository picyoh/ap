import { addGroup } from "../group/group.js";
import { addQuestion } from "../click/question/question.js";
import { addAnswer } from "../click/answer/answer.js";
import { addResult } from "../click/result/result.js";
import { randomColor, randomPick } from "../colorPicker/colorPicker.js";
import { createPath } from "../../svg/links/path/path.js";
import { refreshPaths } from "../../svg/links/linkHandlers.js";
import { waitForElements } from "../../handlers.js";

export const uploadTrigger = () => {
  const uploadInput = document.querySelector("#upload_file");
  uploadInput.addEventListener("change", alertUser, false);
  uploadInput.addEventListener("cancel", (e) => {
    alert("Not a JSON file");
  });
};

const alertUser = (e) => {
  const containers = document.querySelectorAll(".containers");
  if (window.confirm("Effacer le contenu present ?")) {
    containers.forEach((container) => {
      container.remove();
    });
    handleUploadFile(e);
  }
};

const handleUploadFile = (e) => {
  const reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(e.target.files[0]);
};

const onReaderLoad = (e) => {
  var obj = JSON.parse(e.target.result);
  buildImport(obj);
};

const buildImport = (obj) => {
  obj.questions.forEach((row, index) => {
    // addRow
    if (index === 0) {
      const wrapper = document.querySelector("#wrapper");
      buildQuestion(wrapper, row, true);
    } else {
      let hue;
      const pos = { x: "200", y: `${200 * index}` };
      addGroup(pos);
      // add Theme on groups
      document.querySelector(`#group_tag_${index - 1}`).value = row.theme;
      // get current group_content
      const currentGroup =
        document.querySelectorAll(".group_content")[index - 1];
      // Check question or qMulti
      if (row.question) {
        hue = buildQuestion(currentGroup, row);
      } else if (row.qMulti) {
        row.qMulti.forEach((question) => {
          hue = buildQuestion(currentGroup, question);
        });
      }
      row.choices.forEach((answer) => {
        const number = answer.number;
        const count = `${number.split("_")[0]}_${number.split("_")[1]}`;
        //console.log(answer, number);
        if (answer.type === "select") {
          addAnswer(count, 1, hue, "answer_list");
          const element = document.querySelector(
            `#answer_input_output_${number}`
          );
          element.value = answer.title;
        } else if (answer.type === "img") {
          addAnswer(count, 1, hue, "answer_img");
          const element = document.querySelector(`#img_link_${number}`);
          element.value = answer.title;
        } else {
          //console.log(count);
          addAnswer(count, 1, hue, "answer_text");
          const elementInput = document.querySelector(
            `#answer_input_${number}`
          );
          elementInput.value = answer.title;
        }
        const elementTag = document.querySelector(`#answer_tag_${number}`);
        elementTag.value = answer.tag;
        const elementParent = document.querySelector(
          `#answer_parent_${number}`
        );
        elementParent.value = answer.parent;
      });
    }
  });
  const elements = ['.paths', 'circles'];
  elements.forEach(element => waitForElements(element).then(refreshPaths()));
};

const buildQuestion = (wrapper, row, init) => {
  const count = row.number;
  const color = randomColor();
  let pos;
  init ? (pos = { x: "200", y: "120" }) : (pos = { x: 0, y: 0 });
  addQuestion(count, pos, color, wrapper);
  const element = document.querySelector(`#question_input_${count}`);
  element.value = row.question;
  if (init) {
    // change link className
    const linkDom = document.querySelector(".link_circle");
    linkDom.classList.replace("link_top", "link_bottom");
    linkDom.id = `link_0_0_0`;
    // add a tag on question
    const tag = `<input type='hidden' id='answer_tag_${count}_0' name='tag_${count}' class='answer_tag' value='start' />`;
    document
      .querySelector(`#question_${count}`)
      .insertAdjacentHTML("beforeend", tag);
  }
  if (row.parent) {
    buildLinks(row.number, row.parent);
  }
  return randomPick(color);
};

const buildLinks = (number, parent) => {
  const tags = document.querySelectorAll(`.answer_tag`);
  let parentTag = "";
  tags.forEach((tag) => {
    tag.value === parent ? parentTag = tag.id : "";
  });
  const parentId = parentTag.replace('answer_tag', 'link');
  const parentDom = document.querySelector(`#${parentId}`);
  const childDom = document.querySelector(`#link_${number}`);
  createPath(parentDom, childDom)
};

export const importExemple = () => {
  fetch("/js/editor/tools/import/exemple.json")
    .then((response) => response.json())
    .then((json) => buildImport(json));
};

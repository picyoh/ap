import { addGroup } from "../group/group.js";
import { addQuestion } from "../click/question/question.js";
import { addAnswer } from "../click/answer/answer.js";
import { addResult } from "../click/result/result.js";
import { randomColor, randomPick } from "../colorPicker/colorPicker.js";

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
  } else {
    return;
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
      const pos = { x: "270", y: `${15 + 300 * index}` };
      addGroup(pos);
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
        const count = `${number.split('_')[0]}_${number.split('_')[1]}`;
        //console.log(answer, number);
        if (answer.name === "select") {
          addAnswer(count, 1, hue, "answer_list");
          const element = document.querySelector(`#answer_input_output_${number}`);
          element.value = answer.title;
        } else if (answer.src) {
          addAnswer(count, 1, hue, "answer_img");
          const element = document.querySelector(`#img_link_${number}`);
          element.value = answer.title;
        } else {
          console.log( count)
          addAnswer(count, 1, hue, "answer_text");
          const elementInput = document.querySelector(`#answer_input_${number}`);
          elementInput.value = answer.title;
        }
        const elementTag = document.querySelector(`#answer_tag_${number}`);
        elementTag.value = answer.tag;
      });
    }
  });
};

const buildQuestion = (wrapper, row, init) => {
  console.log(row);
  let pos = { x: 0, y: 0 };
  const count = row.number;
  const color = randomColor();
  if (init) {
    pos = { x: "270", y: "15" };
  }
  addQuestion(count, pos, color, wrapper);
  const element = document.querySelector(`#question_input_${count}`);
  element.value = row.question;
  return randomPick(color);
};

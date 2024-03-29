import { addForm } from "../components/form.js";

export const init = () => {
  addForm();
};

export const quizzToJson = (form) => {
  // Variables
  const data = new FormData(form);
  const encaps = { questions: [] };
  let multiple = false;
  let question = {};
  let choices = [];
  let currentQuestion = 0;

  for (const element of data) {
    // get Id
    const id = element[0];
    const splitId = id.split("_");
    const splitLength = splitId.length - 1;
    // get number
    const number = splitId[splitLength];
    // get row number
    const numRow = parseInt(number);
    const numAns = parseInt(number.split('.')[2]) - 1;
    // get type
    const type = element[0].replace(number, "").slice(0, -1);
    // get currentContent
    const currentContent = document.querySelectorAll(".row__content")[numRow];
    multiple = currentContent.children.length > 1;

    console.log(id, splitId, multiple, type);
    // first row
    if (numRow === 0 && element[1] === "") {
      element[1] = "Go !";
    }
    // New row
    if (currentQuestion !== numRow) {
      // append datas to encaps
      encaps.questions.push(question);
      // change row number
      currentQuestion = numRow;
      // reinit obj and arrays
      question = {};
      choices = [];
    }
    // create question
    switch (type) {
      case "question":
        // append question
        if (multiple) {
          let object = {};
          if (!question.qMulti) {
            question.qMulti = [];
          }
          object.question = element[1];
          object.parent = "";
          question.qMulti.push(object);
        } else {
          question.question = element[1];
        }
        break;
      case "answer":
        let choice = {};
        choice.number = number;
        choice.title = element[1].charAt(0).toUpperCase() + element[1].slice(1);
        choice.name = element[1];
        choice.tag ='';
        choice.parent='';
        choices.push(choice);
        question.choices = choices;
        break;
      case "tag":
        question.choices[numAns].tag = element[1];
        break;
      case "question_parent":
        question.parent = element[1];
        break;
      case "answer_parent":
        question.choices[numAns].parent = element[1];
        break;
      default:
        console.log("err switch");
    };
  };
  // append last datas to encaps
  encaps.questions.push(question);
  // stringify
  const json = JSON.stringify(encaps);
  console.log(json);
};

export const downloadJson = () => {
  //TODO: creer blob et le faire down par le navigateur
};

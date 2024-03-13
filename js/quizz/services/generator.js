import { addForm } from "../components/form.js";
import { addTrash } from "./dragdrop.js";

export const init = () => {
  addForm();
  addTrash();
};

export const formToJson = (form) => {
  //TODO:REFACTOR
  // Variables
  const data = new FormData(form);
  const encaps = { questions: [] };
  let multiple = false;
  let question = {};
  let choices = [];
  let currentQuestion = 0;

  // Loop
  data.forEach((value, key) => {
    //TODO: gerer parent des reponses
    //TODO: gerer parent qMulti
    //TODO: gerer tag

    // get entrie number
    let number = key.split("_")[1];
    // parse entrie number
    let numRow = parseInt(number);
    // exclude first row
    if (numRow === 0) {
      //Set default first row value
      if (value === "") {
        value = "Go !";
      }
    } else {
      console.log('ok')
      // check for qMulti
      const currentContent =
        document.querySelectorAll(".row__content")[numRow];
      // set multiple
      multiple = currentContent.children.length > 1;
    }

    console.log(number, numRow, multiple);

    // New rows
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
    if (key.includes("question_")) {
      // append question
      if (multiple) {
        let object = {};
        if (!question.qMulti) {
          question.qMulti = [];
        }
        object.question = value;
        object.parent = "";
        question.qMulti.push(object);
      } else {
        question.question = value;
      }
    }
    // create choices
    if (key.includes("answer_")) {
      let choice = {};
      choice.number = number;
      choice.title = value.charAt(0).toUpperCase() + value.slice(1);
      choice.value = 0;
      choice.name = value;
      choices.push(choice);
      question.choices = choices;
    }
    // set values on choices
    if (key.includes("value_")) {
      const numAns = number.split(".")[2];
      if (value !== "") {
        console.log(numAns, question.choices[numAns]);
        question.choices[numAns].value = value;
        //encaps.questions[numQues].choices[numAns].value = value;
      }
    }
  });
  // append last datas to encaps
  encaps.questions.push(question);
  // stringify
  const json = JSON.stringify(encaps);
  console.log(json);
};

export const downloadJson = () => {
  //TODO: creer blob et le faire down par le navigateur
};

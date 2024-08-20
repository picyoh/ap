import { downloadJson } from "../../submit/download.js";

export const quizzToJson = (form) => {
  // Variables
  const data = new FormData(form);
  const encaps = { questions: [] };
  let multiple = false;
  let question = {};
  let choices = [];
  let currentQuestion = 0;
console.log(data)
  for (const element of data) {
    // get Id
    const id = element[0];
    const splitId = id.split("_");
    const splitLength = splitId.length - 1;
    // get number
    const number = splitId[splitLength];
    // decompose number
    const numRow = parseInt(number);
    const numQues = parseInt(number.split('.')[1]) - 1;
    const numAns = parseInt(number.split('.')[2]) - 1;
    // get type
    const type = element[0].replace(number, "").slice(0, -1);
    // get currentContent
    const currentContent = document.querySelectorAll(".row__content")[numRow];
    multiple = currentContent.children.length > 1;

    //console.log(id, multiple, type, element[1]);
    
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
          object.number = number;
          question.qMulti.push(object);
        } else {
          question.question = element[1];
          question.number = number;
        }
        break;
      case "answer":
        let choice = {};
        choice.number = number;
        choice.title = element[1].charAt(0).toUpperCase() + element[1].slice(1);
        choices.push(choice);
        question.choices = choices;
        break;
      case "tag":
        question.choices[question.choices.length -1].tag = element[1];
        break;
      case "question_parent":
        if(multiple){
          question.qMulti[question.qMulti.length -1].parent = element[1];
        }
        break;
      case "answer_parent":
        question.choices[question.choices.length -1].parent = element[1];
        break;
      default:
        console.log("err switch quizz gen");
    };
  };
  // append last datas to encaps
  encaps.questions.push(question);
  // stringify
  const json = JSON.stringify(encaps);
  const filename = 'questions.json';
  downloadJson(filename, json);
};
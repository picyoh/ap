export const getValues = (dataDom, dataClass) => {
  //console.log(dataDom, dataClass);
  const values = [];
  let elementChildNodes;
  // answer case
  if (dataClass === "answer__input") {
    elementChildNodes = dataDom.childNodes;
  } else if (dataClass === "question__input") {
    // question case
    // get DOM nodes
    const questionNodes = [...dataDom.children];
    const parent = dataDom.parentNode.parentNode.parentNode;
    const answers = [...parent.querySelectorAll(".answer__input")];
    let answerNodes = [];
    // stack children
    answers.forEach((answer) => {
      if (answerNodes.length === 0) {
        answerNodes = [...answer.children];
      } else {
        answerNodes = [...answerNodes, ...answer.children];
      }
      //console.log(answerNodes)
    });
    // concat
    elementChildNodes = [...questionNodes, ...answerNodes];
  }
  // stack the values
  elementChildNodes.forEach((element) => {
    if (element.name) {
      values.push(element.value);
    }
  });
  //console.log(values)
  // remove link and create a new one
  const parentValueNumber = values[1].split("_")[1];
  const dataDomNumber = dataDom.id.split("_")[1];
  const pathId = "path_" + parentValueNumber + "_" + dataDomNumber;
  console.log(pathId)
  //document.getElementById(pathId).remove();

  return values;
};

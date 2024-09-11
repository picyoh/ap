export const setValues = (values, dataClass, newElement) => {
    let elementChildNodes;
    // answer case
    if (dataClass === "answer__input") {
      elementChildNodes = newElement.children;
    }
    // question case
    if (dataClass === "question__input") {
      const questionNodes = [...newElement.querySelector(".question__input").children];
      const answers = [...newElement.querySelectorAll(".answer__input")]
      let answerNodes = [];
       // stack children
       answers.forEach((answer)=>{
        if(answerNodes.length === 0){
          answerNodes = [...answer.children]
        }else {
          answerNodes = [...answerNodes, ...answer.children]
        }
      });
      // concat
      elementChildNodes = [...questionNodes, ...answerNodes];
      //console.log(elementChildNodes)
      /* Update Links */
      // get parent element
      const parentElement = document.getElementById(values[1]);
      // get parent link element
      const parentLinkElement = parentElement.parentNode.firstElementChild;
      // get current question element
      const currentQuestion = questionNodes[0].parentNode;
      // get current question link element
      const currentQuestionLink = questionNodes[0].parentNode.parentNode.firstElementChild;
      // create new path
      getPositions(parentLinkElement, 'start');
      getPositions(currentQuestionLink, 'end');
      createLink(parentElement, currentQuestion);
    }
  
    let index = 0;
    // set the values
    elementChildNodes.forEach((element) => {
      if (element.name) {
        //console.log(values, index);
        element.value = values[index];
        index++;
      }
    });
  };
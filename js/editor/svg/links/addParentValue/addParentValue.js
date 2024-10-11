export const addParentValue = (linkBottom, linkTop) => {
  // get parent tag value (linkBottom)
  const parentTag = `answer_${linkBottom.id.replace("link", "tag")}`;
  const parentTagValue = document.getElementById(parentTag).value;
  /* console.log(parentTag, parentTagValue); */
  // get child container (linkTop)
  const childContainer = linkTop.closest(".containers");
  // set child question_parent input value
  childContainer.querySelector('.question_parents').value = parentTagValue;
    // set answers answer_parent input values
  const answers = childContainer.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.querySelector('.answer_parents').value = parentTagValue;
  });
};

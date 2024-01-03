//TODO: trouver systeme pour tag sur chaques questions
export const questionCheckbox = (questionCount) => {
  const questionCheckbox = `
    <div class='generator__checkbox'>
      <input type="checkbox" id='checkbox_${questionCount}' name="checkbox_multi" value="checkbox_${questionCount}" />
      <label for="checkbox_${questionCount}">La prochaine question depend d'une des precedentes questions ?'</label>
    </div>
    `;
  const questionDiv = document.querySelectorAll(".generator__container");
  const lastQuestionDiv = questionDiv[questionDiv.length - 1];
  lastQuestionDiv.insertAdjacentHTML("beforeend", questionCheckbox);
};

export const newSimpleContent = (questionCount) => {
  const content = `
  <div class="generator__question__${questionCount}__1">
    <h3>Question ${questionCount}</h3>
    <label for="question_${questionCount}">Question :</label>
    <input type="text" id="question_${questionCount}" name="question_${questionCount}" />
    <button class="generator__question__addQuestion">+</button>
  </div>
  `;
  const questionDiv = document.querySelectorAll('.generator__container');
  const lastQuestionDiv = questionDiv[questionDiv.length - 1];
  lastQuestionDiv.insertAdjacentHTML("beforeend", content);
};

export const newMultiContent = (questionCount, multiCount) => {
  const content = `
  <div class="generator__question__${questionCount}__${multiCount}">
    <h3>Question ${questionCount}.${multiCount}</h3>
    <label for="question_${questionCount}.${multiCount}">Question :</label>
    <input type="text" id="question_${questionCount}.${multiCount}" name="question_${questionCount}.${multiCount}" />
    <label for="parent_${questionCount}.${multiCount}">Parent :</label>
    <input type="text" id="parent_${questionCount}.${multiCount}" name="parent_${questionCount}.${multiCount}" />
    <button class="generator__question__addMulti">/</button>
    <button class="generator__question__addQuestion">+</button>
  </div>
  `;
  const questionDiv = document.querySelectorAll('.generator__container');
  const lastQuestionDiv = questionDiv[questionDiv.length - 1];
  lastQuestionDiv.insertAdjacentHTML("beforeend", content);
}
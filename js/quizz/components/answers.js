export const newAnswer = (questionCount, multiCount, answerCount) => {
  const answer = `
  <div id="answer__${questionCount}__${multiCount}" class="generator__answers"></div>
  <button id="answer__button__${questionCount}__${multiCount}" class="generator__question__addAnswer">+</button>
    `;
  // get current answers group
  console.log(questionCount, multiCount, answerCount)
  const answersGroup = document.querySelectorAll(".generator__question__"+ questionCount+'__'+ multiCount);
  const lastAnswerGroup = answersGroup[answersGroup.length - 1]
  lastAnswerGroup.insertAdjacentHTML("beforeend", answer);
  answerContent(questionCount, multiCount, answerCount);
};

export const answerContent = (questionCount, multiCount, answerCount) => {
const answer = `
<div class="generator___answers__input__${questionCount}__${multiCount}__${answerCount}">
  <label for="answer__${questionCount}__${multiCount}__${answerCount}">Réponse ${answerCount} :</label>
  <input type="text" id="answer__${questionCount}__${multiCount}__${answerCount}" name="answer__${questionCount}__${multiCount}__${answerCount}" />
</div>
`;
const answerGroup = document.querySelector("#answer__" + questionCount +"__"+ multiCount);
//console.log(answerGroup, questionCount)
answerGroup.insertAdjacentHTML("beforeend", answer);
}
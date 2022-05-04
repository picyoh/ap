const counter = 1;
const newAnswer = () => {
  const answer = `
    <div class="generator___answers__input">
      <label for="question">Réponse :</label>
      <input type="text" id="question" name="question">
    </div>
  `;
  const answersGroup = document.querySelector(".generator__answers");
  answersGroup.insertAdjacentHTML("afterbegin", answer);
};

const newQuestion = () => {
  const question = `
  <div class="generator__question${counter}">
    <h3>Question ${counter}</h3>
    <label for="question">Votre question :</label>
    <input type="text" id="question" name="question">
    <button class="generator__question__addQuestion">+</button>
  </div>
  <div class="generator__answers">

  <button class="generator__question__addQuestion">+</button>
</div>
  `;
  const form = document.querySelector(".generator");
  form.insertAdjacentHTML("beforeend", question);
  newAnswer();
  newAnswer();
  counter++;
};

export const questionForm = () => {
  const form = `
  <form class="generator">

  </form>
  `;
  main.insertAdjacentHTML("afterbegin", form);
  newQuestion();
};

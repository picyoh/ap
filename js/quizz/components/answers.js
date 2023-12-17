export const newAnswer = (index) => {
  console.log(index);
  const answer = `
      <div class="generator___answers__input">
        <label for="question">Réponse :</label>
        <input type="text" id="question" name="question">
      </div>
    `;
  // get current answers group
  const answersGroup = document.querySelectorAll(".generator__answers");
  const lastAnswersGroup = answersGroup[index];
  lastAnswersGroup.insertAdjacentHTML("afterbegin", answer);
};

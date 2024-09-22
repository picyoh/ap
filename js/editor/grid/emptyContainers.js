export const addEmptyContainers = (countNumber, nmbCol) => {
  const wrapper = document.querySelector('#wrapper');
  const newCount = parseInt(countNumber + 1);
  const maxCount = parseInt(countNumber + nmbCol);
  console.log(countNumber, maxCount, newCount);
  for (let i = newCount; i <= maxCount; i++) {
    const emptyContainer = `<div class='container empty_container' id='container_${i}'></div>`;
    wrapper.insertAdjacentHTML("beforeend", emptyContainer);
  }
};

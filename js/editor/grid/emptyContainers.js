export const addEmptyContainers = (countNumber, rowNmb, colNmb) => {
  const wrapper = document.querySelector("#wrapper");
  const rows = `<div class="rows"></div>`;
  wrapper.insertAdjacentHTML("beforeend", rows);
  const rowsDiv = document.querySelector(".rows");
  for (let i = countNumber; i <= rowNmb -1; i++) {
    const row = `<div id='row_${ i + 1 }' class='row'></div>`;
    rowsDiv.insertAdjacentHTML("beforeend", row);
    for (let j = countNumber; j <= colNmb - 1; j++) {
      //console.log(countNumber, i, j);
      const emptyContainer = `<div id='container_${i + 1}_${j + 1}' class='container empty_container'></div>`;
      const currentRow = "#row_" + parseInt(i + 1);
      const row = document.querySelector(currentRow);
      row.insertAdjacentHTML("beforeend", emptyContainer);
    }
  }
};

import { addRow } from "./row.js";

export const addRowHandler = () => {
  const addRowBtns = document.querySelectorAll(".add_row");
  addRowBtns.forEach((addRowBtn) => {
    addRowBtn.addEventListener(
      "click",
      (e) => {
        console.log('row')
        const rowNumber = parseInt(
          e.target.parentNode.children.length
        );
        //console.log('is this div.rows ? : ' + e.target.parentNode)
        addRow(rowNumber);
      },
      { once: true }
    );
  });
};

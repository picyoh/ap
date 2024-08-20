import { addRow } from "./row.js";

export const addRowHandler = () => {
  const addRowBtns = document.querySelectorAll(".add_row");
  addRowBtns.forEach((addRowBtn) => {
    addRowBtn.addEventListener(
      "click",
      (e) => {
        const rowNumber = parseInt(
          e.target.parentNode.parentNode.children.length
        );
        addRow(rowNumber);
      },
      { once: true }
    );
  });
};

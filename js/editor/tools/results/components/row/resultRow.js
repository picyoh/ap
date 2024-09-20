import { addResult } from "../result/result.js";
import { initPreview } from "../../initResult.js";

export const addResultRow = () => {
  const rows = document.querySelectorAll(".result__row");
  const rowNumber = rows.length + 1;
  const row = `<div id='result_row_${rowNumber}' class='result__row'></div>`;
  const submitBtn = document.querySelector("#submitResult");
  submitBtn.insertAdjacentHTML("beforebegin", row);
  addResult(rowNumber);
  initPreview(rowNumber);
};

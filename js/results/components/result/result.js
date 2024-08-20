import { initPreview } from "../../initResult.js";
import {addResultHandler} from '../../services/resultHandler.js';
import { imgPreviewHandler, linkPreviewHandler, dropdownHandler } from "../../services/resultHandler.js";

export const addResult = (rowNumber) => {
  const result = `
      <div class='result'>
        <div class='dropdown'>
          <label for='result_${rowNumber}'>Name :</label>
          <input type='text' id='result_${rowNumber}' name='result_${rowNumber}' placeHolder='Result ${rowNumber}'>
        </div>
          <label for='img_link_${rowNumber}'>Image link :</label>
          <input type='text' id='img_link_${rowNumber}' name='img_link_${rowNumber}' class='img_link' placeholder='https://'>
          <label for='aff_link_${rowNumber}'>Affiliate link :</label>
          <input type='text' id='aff_link_${rowNumber}' name='aff_link_${rowNumber}' class='aff_link' placeholder='https://'>
          <label for='value_${rowNumber}'>Value :</label>
          <input type='range' id='value_${rowNumber}' name='value_${rowNumber}' list='tickmarks' min='0' max='10'>
          <label for='tags_${rowNumber}'>Tags :</label>
          <output class='tags__area' id='tags_${rowNumber}' data-drop-target='true'></output>
          <input type='hidden' id='tags_${rowNumber}' name='tags_${rowNumber}'>
      </div>
      `;
  const results = document.querySelector("#result_row_" + rowNumber);
  results.insertAdjacentHTML("beforeend", result);
  addResultHandler();
  imgPreviewHandler();
  linkPreviewHandler();
  dropdownHandler();
};

import { addResultRow } from "../components/row/resultRow.js";
import { addImgPreview, addLinkPreview } from "../components/preview/previews.js";

export const addResultHandler = () => {
  const addResultBtn = document.querySelector(".add_result");
  addResultBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addResultRow();
  });
};

export const imgPreviewHandler = () => {
  const imgInputs = document.querySelectorAll(".img_link");
  imgInputs.forEach((imgInput) => {
    imgInput.addEventListener("change", (e) => {
      e.preventDefault();
      //console.log(e.target.id, e.target.value);
      const rowNumber = parseInt(e.target.id.split("_")[2]);
      addImgPreview(rowNumber, e.target.value);
    });
  });
};

export const linkPreviewHandler = () => {
  const linkInputs = document.querySelectorAll(".aff_link");
  linkInputs.forEach((linkInput) => {
    linkInput.addEventListener("change", (e) => {
      e.preventDefault();
      //console.log(e.target.id, e.target.value);
      const rowNumber = parseInt(e.target.id.split("_")[2]);
      addLinkPreview(rowNumber, e.target.value);
    });
  });
};

export const dropdownHandler = () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      const resultClass = dropdown.parentNode.classList.value;
      const inputs = dropdown.parentNode.childNodes;
      inputs.forEach((input) => {
        //console.log(input)
        if (resultClass === "result") {
          if (
            input.classList === undefined ||
            input.classList.value !== "dropdown"
          ) {
            input.style = "display: none;";
          }
        } else {
            input.style = '';
        }
      });
      const preview = dropdown.parentNode.parentNode.querySelector(".preview");
      if(resultClass === 'result'){
          preview.style = "display: none;";
          dropdown.parentNode.classList = "full_result";
      }else {
        preview.style = "";
        dropdown.parentNode.classList = "result";
      }
    });
  });
};

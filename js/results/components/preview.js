export const initPreview = (rowNumber) => {
  const preview = `
      <div class='preview' id='preview_${rowNumber}'>
          <div class="img__container">
          <i class="fa-regular fa-image fa-2xl img_preview"></i>
          </div>
          <p class='link_preview'>No link</p>
      </div>
      `;
  const results = document.querySelector("#result_row_" + rowNumber);
  results.insertAdjacentHTML("beforeend", preview);
};

export const addImgPreview = (rowNumber, imgSrc) => {
  const preview = `
    <div class=img__container'>
      <img class='img_preview' id='img_preview_${rowNumber}' src='${imgSrc}' alt='preview result ${rowNumber}' />
    </div>
    `;
  const parent = document.querySelector("#preview_" + rowNumber);
  parent.querySelector(".img_preview").parentNode.remove();
  parent.insertAdjacentHTML("afterbegin", preview);
};

export const addLinkPreview = (rowNumber, linkSrc) => {
  const preview = `<a class='link_preview' id='link_preview_${rowNumber}' href='${linkSrc}' target='_blank'>Lien</a>`;
  const parent = document.querySelector("#preview_" + rowNumber);
  parent.querySelector(".link_preview").remove();
  parent.insertAdjacentHTML("beforeend", preview);
};

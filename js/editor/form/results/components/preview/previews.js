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

export const toogleDropdown = (label) => {
  const labelDom = document.querySelector(`#${label}_menu`);
  if (labelDom) {
    labelDom.classList.toggle("visible");
  }
};

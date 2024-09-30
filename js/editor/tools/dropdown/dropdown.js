export const toogleDropdown = (label) => {
    const labelDom = document.querySelector(`#${label}_menu`);
    labelDom.classList.toggle('visible');
};
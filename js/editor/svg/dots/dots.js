//TODO: continue if we need drag handlers

export const addDragHandle = (parent) => {
  const dotContainer = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
    `;
  const dot = `<circle cx='50' cy='50' r='50' />`;
  const handleContainer = parent.querySelector(".drag_handle_container");
  //console.log(parent)
  handleContainer.insertAdjacentHTML("beforeend", dotContainer);
};

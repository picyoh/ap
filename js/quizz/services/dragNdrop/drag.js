// Drag start
export const dragStartHandler = (e) => {
  e.stopPropagation();
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.effectAllowed = "move";
  //console.log(e.dataTransfer, e.target.id);
};

// Drag over
export const dragOverHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "move";
};
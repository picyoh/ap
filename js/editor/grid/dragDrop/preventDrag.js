const preventDragByType = (type) => {
  const elements = document.querySelectorAll(`${type}`);
  elements.forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      e.target.parentNode.setAttribute("draggable", false);
    });
    element.addEventListener("mouseleave", (e) => {
      e.target.parentNode.setAttribute("draggable", true);
    });
  });
};

export const preventDrag = () => {
  const elements = ['input[type="range"]', 'input[type="text"]', "textarea"];
  elements.forEach((element)=>{
    preventDragByType(element);
  });
};

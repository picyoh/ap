const preventDragOnRanges = () => {
  const ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach((range) => {
    range.addEventListener("mouseenter", (e) => {
      e.target.parentNode.setAttribute("draggable", false);
    });
    range.addEventListener("mouseleave", (e) => {
      e.target.parentNode.setAttribute("draggable", true);
    });
  });
};
 
const preventDragOnInputs = () => {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach((input) => {
    input.addEventListener("mouseenter", (e) => {
      e.target.parentNode.setAttribute("draggable", false);
    });
    input.addEventListener("mouseleave", (e) => {
      e.target.parentNode.setAttribute("draggable", true);
    });
  });
};

const preventDragOnAreas = () => {
  const areas = document.querySelectorAll("textarea");
  areas.forEach((area) => {
    area.addEventListener("mouseenter", (e) => {
      e.target.parentNode.setAttribute("draggable", false);
    });
    area.addEventListener("mouseleave", (e) => {
      e.target.parentNode.setAttribute("draggable", true);
    });
  });
};

export const preventDrag = () => {
  preventDragOnRanges()
  preventDragOnInputs()
  preventDragOnAreas()
}

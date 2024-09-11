export const addCircle = (number, elementX, elementY) => {
  const element = "circle_" + number;
  const elementDom = document.getElementById(element);
  // avoiding to duplicate circles
  if (elementDom === null) {
    const circle = `<circle id='circle_${number}' cx='${elementX}' cy='${elementY}' r='5'/>`;
    const svg = document.querySelector("svg");
    svg.insertAdjacentHTML("beforeend", circle);
  }
};

export const removeCircle = (number) => {
  const id = "circle_" + number;
  document.getElementById(id).remove();
};
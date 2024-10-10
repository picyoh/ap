export const addCircle = (firstNumber, secondNumber, elementX, elementY) => {
  const number = `${firstNumber}_${secondNumber}`;
  const element = `circle_${number}`;
  const elementDom = document.getElementById(element);
  // avoiding to duplicate circles
  console.log(number, elementX, elementY, elementDom);
  if (elementDom === null) {
    const circle = `<circle id='circle_${number}' class='circles' cx='${elementX}' cy='${elementY}' r='5'/>`;
    const svg = document.querySelector("svg");
    svg.insertAdjacentHTML("beforeend", circle);
  }
};

export const removeCircle = (number) => {
  const id = "circle_" + number;
  document.getElementById(id).remove();
};

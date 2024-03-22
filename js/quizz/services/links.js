const calcHeightWidth = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
};

export const initCanvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = `<canvas id='links' width='${width}' height='${height}'></canvas>`;
  const links = document.querySelector("html");
  links.insertAdjacentHTML("afterbegin", canvas);
};

export const createLink = (first, second) => {
  const canvas = document.querySelector("#links");
  const ctx = canvas.getContext("2d");
  // get positions
  const x1 = first.offsetLeft + first.offsetWidth / 2;
  const y1 = first.offsetTop + first.offsetHeight / 2;
  const x2 = second.offsetLeft + second.offsetWidth / 2;
  const y2 = second.offsetTop + second.offsetHeight / 2;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(x1, y1, x2, y2);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.stroke();
  //TODO: add circles
  //TODO: add animation/gravity
};

export const addParentValue = (dragged, target) => {
  // get Numbers in arrays
  const draggedNumber = getNumber(dragged.id);
  const targetNumber = getNumber(target.id);
  console.log(draggedNumber, targetNumber);
  // Compare
  // question cases
  let elementChildNodes =
    draggedNumber.length === 2
      ? dragged
      : targetNumber.length === 2
      ? target
      : "";
  // answers cases
  if (elementChildNodes === "") {
    // get lower answer id
    for (let i = 0; i < 3; i++) {
      //console.log(draggedNumber[i], targetNumber[i]);
      if (draggedNumber[i] !== targetNumber[i]) {
        draggedNumber[i] > targetNumber[i]
          ? (elementChildNodes = dragged)
          : (elementChildNodes = target);
        break;
      }
    }
  }
  const parent = target === elementChildNodes ? dragged : target;
  console.log(elementChildNodes, elementChildNodes.parentNode);
  elementChildNodes.parentNode.querySelector("input[type=hidden]").value =
    parent.id;
  //console.log("elementChildNodes : " + elementChildNodes.id + " parent : " + parent.id);
};

export const checkLinkable = (dragged, target) => {
  //TODO: control links (answer -> question) + control parents (answer.parent !== question)
  //console.log(dragged, target)
  return true;
};
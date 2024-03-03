export const addTrash = () => {
  const trash = `
<div id='trash' data-drop-target='true'>
    <i class="fa-solid fa-trash-can fa-2xl"></i>
</div>
`;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", trash);
};

const removeEmptyRow = () => {
  //get rows
  const rows = document.querySelectorAll(".row__content");
  rows.forEach((row) => {
    //get row length
    const rowlength = row.querySelectorAll(".container").length;
    if (rowlength === 0) {
      //remove
      row.parentNode.remove();
      reNumbering();
    }
  });
};

//TODO: renaming question reponse
const reNumbering = () => { };

const dragStartHandler = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  //console.log(e.dataTransfer, e.target.id);
  e.dataTransfer.effectAllowed = "move";
};

const dragOverHandler = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  e.dataTransfer.dropEffect = "move";
};

const dropHandler = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const data = e.dataTransfer.getData("text/plain");
  const dataDom = document.getElementById(data);
  const dataClass = dataDom.classList.value;
  const targetClass = e.target.classList.value;
  console.log(e.target, data, targetClass, dataClass);

  if (e.target.id === "trash") {
    // trash case
    document.getElementById(data).remove();
    reNumbering();
  } else {
    // containers case
    if (targetClass === "row__content" && dataClass === "container") {
      const containerBtn = e.target.querySelector(".add_container");
      containerBtn.insertAdjacentElement("beforebegin", dataDom);
      removeEmptyRow();
    }
    // answers cases
    if (targetClass === "answers" && dataClass === "answer") {
      const answerBtn = e.target.querySelector(".add_answer");
      answerBtn.insertAdjacentElement("beforebegin", dataDom);
      reNumbering();
    }
  }
};

export const dragDropHandler = () => {
  // get draggable elements
  const draggables = document.querySelectorAll("[draggable='true']");
  //console.log(draggables);
  draggables.forEach((draggable) => {
    // trigger event
    draggable.addEventListener("dragstart", (e) => {
      dragStartHandler(e);
    });
  });
  // get targets
  const targets = document.querySelectorAll("[data-drop-target]");
  targets.forEach((target) => {
    // trigger events
    target.addEventListener("dragover", (e) => {
      dragOverHandler(e);
    });
    target.addEventListener("drop", (e) => {
      dropHandler(e);
    });
  });
};

//TODO: add linkables part

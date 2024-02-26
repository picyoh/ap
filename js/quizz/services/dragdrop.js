export const addTrash = () => {
  const trash = `
<div id='trash' data-drop-target='true'>
    <i class="fa-solid fa-trash-can fa-2xl"></i>
</div>
`;
  const main = document.querySelector("#main");
  main.insertAdjacentHTML("beforeend", trash);
};

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
//TODO: gerer le append pour ajouter avant le bouton concerne
//TODO: si container ou answers vide => remove
//TODO: checker e.target pour voir si ajoutable a la drop zone
const dropHandler = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const data = e.dataTransfer.getData("text/plain");
  console.log(e.target, e.dataTransfer);

  if(e.target.id === 'trash'){
      // trash case
    document.getElementById(data).remove();
  }else{
    // containers and answers cases
    e.target.appendChild(document.getElementById(data));
  }
};

export const dragDropHandler = () => {
  // get draggable elements
  const draggables = document.querySelectorAll("[draggable='true']");
  //console.log(draggables);
  // loop on draggables and trigger event
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      dragStartHandler(e);
    });
  });

  const targets = document.querySelectorAll("[data-drop-target]");
  targets.forEach((target) => {
    target.addEventListener("dragover", (e) => {
      dragOverHandler(e);
    });
    target.addEventListener("drop", (e) => {
      dropHandler(e);
    });
  });
};

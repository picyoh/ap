let grabbing = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;
let scrollSpeed = 1;

export const navigateHandler = () => {
  const editor = document.querySelector("#editor");
  //console.log(editor, grabbing);
  editor.addEventListener("mouseup", (e) => {
    grabbing = false;
    editor.style.cursor = "grab";
  });

  editor.addEventListener("mouseleave", (e) => {
    grabbing = false;
    editor.style.cursor = "grab";
  });

  editor.addEventListener("mousedown", (e) => {
    grabbing = true;
    startX = e.pageX - editor.offsetLeft;
    startY = e.pageY - editor.offsetTop;
    editor.style.cursor = "grabbing";
    console.log(startX, startY)
    navigating();
  });
};

const navigating = () => {
  document.addEventListener("mousemove", (e) => {
    if (!grabbing) return;
    const editor = document.querySelector('#editor');
    const endX = e.pageX - editor.offsetLeft;
    const endY = e.pageY - editor.offsetTop;
    const walkX = (startX - endX) * scrollSpeed;
    const walkY = (startY - endY) * scrollSpeed;
    console.log(startX, endX, walkX);
    editor.scrollLeft = walkX;
    editor.scrollTop = walkY;
  });
};

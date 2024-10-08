
let grabbing = false;
let startX;
let startY;
let scrollSpeed = 1;

export const navigateHandler = () => {
  startX = 0;
  startY = 0;
  const wrapper = document.querySelector("#wrapper");
  //console.log(wrapper, grabbing);
  wrapper.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    grabbing = false;
    wrapper.style.cursor = "grab";
    //resetwrapper()
  });

  wrapper.addEventListener("mouseleave", (e) => {
    grabbing = false;
    wrapper.style.cursor = "grab";
    //resetwrapper()
  });

  wrapper.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    if(e.target.id === 'wrapper'){
      grabbing = true;
      startX = e.pageX - wrapper.offsetLeft;
      startY = e.pageY - wrapper.offsetTop;
      wrapper.style.cursor = "all-scroll";
      navigating();
    }
  });
};


export const navigating = () => {
  const editor = document.querySelector("#editor");
  editor.addEventListener("mousemove", (e) => {
    if (!grabbing) return;
    const endX = e.pageX - editor.offsetLeft;
    const endY = e.pageY - editor.offsetTop;
    const walkX = (startX - endX) * scrollSpeed;
    const walkY = (startY - endY) * scrollSpeed;
    //console.log(startX, endX, walkX);
    editor.scrollLeft = walkX;
    editor.scrollTop = walkY;
    editor.style.transformOrigin = `${startX} ${startY}`;
  });
};

// TODO: clean listeners
const resetwrapper = () => {
  const wrapper = document.querySelector("#wrapper");
  wrapper.replaceWith(wrapper.cloneNode(true));
}
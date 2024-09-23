let zoom = 1;

export const addZoomIcons = () => {
  const zoomIcons = `
    <div id='zoomIcons'>
        <i id="zoom_minus" class="fa-solid fa-circle-minus zoom"></i>
        <i id="zoom_plus" class="fa-solid fa-circle-plus zoom"></i>
    </div>
    `;
  const editor = document.querySelector("#editor");
  editor.insertAdjacentHTML("afterbegin", zoomIcons);
  zoomIconsHandler()
};

const zoomIconsHandler = () => {
  const zoomBtns = document.querySelectorAll(".zoom");
  zoomBtns.forEach((zoomBtn) => {
    zoomBtn.addEventListener("click", (e) => {
      applyZoom(e.target.id);
    });
  });
};

const applyZoom = (target) => {
    const wrapper = document.querySelector('#wrapper');
    if(target === 'zoom_minus'){
        zoom -= .1;
    }else if(target === 'zoom_plus'){
        zoom += .1;
    }
    //console.log(wrapper.style);
    wrapper.style.transform = `scale(${zoom}) `
};

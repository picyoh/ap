import { resetHandlers } from "../../handlers.js";

const min = 0;
const max = 2;
let zoom = 1;

export const addZoomIcons = () => {
  const zoomIcons = `
    <div id='zoomIcons'>
        <i id="zoom_minus" class="fi fi-rr-minus-circle zoom"></i>
        <i id="zoom_reset" class="fi fi-rr-rotate-left zoom"></i>
        <i id="zoom_plus" class="fi fi-rr-add zoom"></i>
    </div>
    `;
  const editor = document.querySelector("#editor");
  editor.insertAdjacentHTML("afterbegin", zoomIcons);
  zoomIconsHandler();
};

export const zoomIconsHandler = () => {
  const zoomBtns = document.querySelectorAll(".zoom");
  zoomBtns.forEach((zoomBtn) => {
    zoomBtn.addEventListener(
      "click",
      (e) => {
        zooming(e.target.id);
        console.log(zoom);
      },
      { once: true }
    );
  });
};

const zooming = (target) => {
  const wrapper = document.querySelector("#wrapper");
  switch (target) {
    case "zoom_minus":
      if (zoom > min) {
        zoom -= 0.1;
      }
      break;
    case "zoom_plus":
      if (zoom < max) {
        zoom += 0.1;
      }
      break;
    case "zoom_reset":
      zoom = 1;
    default:
      console.log("switch apply zoom error");
      break;
  }
  //console.log(wrapper.style);
  wrapper.style.transformOrigin = `0% 0%`;
  wrapper.style.transform = `scale(${zoom})`;
  resetHandlers();
};

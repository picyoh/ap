import { resetHandlers } from "../../resetHandlers.js";

const min = 0;
const max = 2;
let zoom = 1;

export const addZoomIcons = () => {
  const zoomIcons = `
    <div id='zoomIcons'>
        <i id="zoom_minus" class="fa-solid fa-circle-minus zoom"></i>
        <i id="zoom_reset" class="fa-solid fa-rotate-left zoom"></i>
        <i id="zoom_plus" class="fa-solid fa-circle-plus zoom"></i>
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
  //TODO: fix origin or add translate or transform origin oin editor or ???
  wrapper.style.transformOrigin = `100% 100%`;
  wrapper.style.transform = `scale(${zoom})`;
  resetHandlers();
};

import { addRowHandler } from "./grid/row.js";
import { addColumnHandler } from "./grid/column.js";
import { zoomIconsHandler } from "./grid/zoom/zoomIcons.js";
import { navigateHandler } from "./grid/navigate/navigateWrapper.js";

let loaded = false;
const buttons = [
  "zoom_minus",
  "zoom_plus",
  "zoom_reset"
];

export const waitForElements = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export const initHandlers = () =>{
  let count = 0;
  buttons.forEach((button) => {
    waitForElements("#" + button).then((e) => {
      count++;
      if(count === buttons.length){
        loaded = true;
      }
    });
  });
}

export const resetHandlers = () => {
    removeListeners(buttons);
    zoomIconsHandler();
    navigateHandler();
};

export const removeListeners = (buttons) => {
  buttons.forEach((button) => {
    const btns = document.querySelectorAll("#" + button);
    btns.forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true));
    });
  });
};

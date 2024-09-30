import { zoomIconsHandler } from "./zoom/zoomIcons.js";
import { navigateHandler } from "./navigate/navigateWrapper.js";

const buttons = [
  "zoom_minus",
  "zoom_plus",
  "zoom_reset",
  "wrapper"
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
        resetHandlers()
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

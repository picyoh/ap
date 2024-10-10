import { zoomIconsHandler } from "./grid/zoom/zoomIcons.js";
import { navigateHandler } from "./grid/navigate/navigateWrapper.js";
import { linksHandler } from "./svg/links/linkHandlers.js";
import { dragDropHandler } from "./grid/dragDrop/dragdropHandler.js";

const elements = [
  "#zoom_minus",
  "#zoom_plus",
  "#zoom_reset",
  "#wrapper",
  ".link_circle",
  ".grip",
  ".containers"
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
  elements.forEach((element) => {
    waitForElements(element).then((e) => {
      count++;
      if(count === elements.length){
        resetHandlers()
      }
    });
  });
}

export const resetHandlers = () => {
    removeListeners(elements);
    zoomIconsHandler();
    navigateHandler();
    linksHandler();
    dragDropHandler();
};

export const removeListeners = (elements) => {
  elements.forEach((element) => {
    const doms = document.querySelectorAll(element);
    doms.forEach((dom) => {
      dom.replaceWith(dom.cloneNode(true));
    });
  });
};

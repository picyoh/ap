import { zoomIconsHandler } from "./tools/zoom/zoomIcons.js"

export const resetHandlers = () => {
    const buttons = ["zoom"];

    removeListeners(buttons);
    
    zoomIconsHandler();

}

export const removeListeners = (buttons) =>{
    buttons.forEach((button)=> {
        const btns = document.querySelectorAll("." + button);
  btns.forEach((btn) => {
    btn.replaceWith(btn.cloneNode(true));
    });
  });
}
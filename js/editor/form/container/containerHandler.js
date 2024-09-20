import { addContainer } from "./container.js";

export const addContainerHandler = () => {
    const addContainerBtns = document.querySelectorAll(".add_container");
    addContainerBtns.forEach((addContainerBtn) => {
      addContainerBtn.addEventListener(
        "click",
        (e) => {
          const parent = e.target.parentNode.parentNode.parentNode;
          console.log(parent);
          addContainer(parent);
        },
        { once: true }
      );
    });
  };
  
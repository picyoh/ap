import { removeListeners } from "../../handlers.js";
import { setGroupStart } from "./group.js";

export const groupHandler = () => {
  removeListeners(["#wrapper"]);
  const wrapper = document.querySelector("#wrapper");
  wrapper.addEventListener(
    "click",
    (e) => {
      setGroupStart(e);
    },
    { once: true }
  );
};
import { loginmodal } from "./Modal.js";

const loginBtn = document.querySelector(".login");

export const handleLogin = () => {
  const state = loginBtn.innerHTML;
  console.log(state);
  if (state === "Login") {
    loginmodal();
    loginBtn.innerHTML = "Logout";
  }
  if (state === "Logout") {
    const modal = document.querySelector(".modal");
    modal.remove();
    loginBtn.innerHTML = "Login";
  }
};

// const loginListener = loginBtn.addEventListener("click", handleLogin);
more
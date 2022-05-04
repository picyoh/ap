const loginBtn = document.querySelector(".login");

const loginModale = () => {
  const modale = `
    <div class="modale">
        <form class="modale__login">
            <div class="modale__login__input">
                <label for="name">Username :</label>
                <input type="text" id="user" name="user_name" >
            </div>
            <div class="modale__login__input">
                <label for="password">Password :</label>
                <input type="text" id="password" name="user_name" >
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    `;
  main.insertAdjacentHTML('afterbegin', modale);
};

export const handleLogin = () => {
  const state = loginBtn.innerHTML;
  console.log(state);
  if (state === "Login") {
    loginModale();
  }
  if (state === "Logout") {
    console.log("disconnect");
  }
};

// const loginListener = loginBtn.addEventListener("click", handleLogin);

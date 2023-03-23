export const loginmodal = () => {
  const modal = `
    <div class="modal">
        <form class="modal__login">
            <div class="modal__login__input">
                <label for="name">Username :</label>
                <input type="text" id="user" name="user_name" >
            </div>
            <div class="modal__login__input">
                <label for="password">Password :</label>
                <input type="text" id="password" name="user_name" >
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    `;
  main.insertAdjacentHTML('afterbegin', modal);
};




more
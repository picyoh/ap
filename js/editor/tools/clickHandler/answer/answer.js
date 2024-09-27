export const addAnswer = (contNumber, target, iter) => {
    const container = document.querySelector()
  for (i = 0; i < iter; i++) {
    const number = `${contNumber}_${i}`;
    const answer = `
            <div class='answer'>
                <div class='drag_handle_container'></div>
                    <div class='answer__input' id='answer_${number} draggable='true'>
                        <label for='answer_input_${number}'>answer :&nbsp;</label>
                        <textarea id='answer_input_${number}' name='answer_${number}'></textarea>
                        <input type='hidden' id='answer_parent_${number}' name='answer_parent_${number}'/>
                    </div>
                </div>
            </div>
            `;
    target.insertAdjacentHTML("beforeend", answer);
  }
};

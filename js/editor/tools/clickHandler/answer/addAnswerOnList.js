export const addAnswerOnList = (number) =>{
    const btn = document.querySelector(`#answer_input_button_${number}`);
    console.log(btn, number)
    btn.addEventListener('click', (e)=>{
        const input = document.querySelector(`#answer_input_${number}`);
        console.log(input.value);
        const output = document.querySelector(`#answer_input_output_${number}`);
        const childNumber = output.children.length;
        const answer = `<div id="answer_input_output_${number}_${childNumber}" class="output_entries">${input.value}</div> `
        output.insertAdjacentHTML('beforeend', answer);
    })
};
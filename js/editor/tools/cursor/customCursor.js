import { resetHandlers } from "../../grid/gridHandler.js";

export const addCursor = (labelId) => {
    const cursorClass = document.querySelector(`#${labelId}`).children[0].classList.value;
    const cursorTemp = `<i id='custom_cursor' class="${cursorClass}"></i>`;
    const wrapper = document.querySelector('#wrapper');
    wrapper.insertAdjacentHTML('beforeend', cursorTemp);
    const cursor = wrapper.querySelector('#custom_cursor');
    animateCursor(wrapper, cursor);
    deleteCursor(wrapper, cursor);
};

const animateCursor = (wrapper, cursor) => {
    wrapper.addEventListener('mousemove', (e)=>{
        cursor.style = `position: relative; top: ${e.offsetY + 15}px; left: ${e.offsetX+ 15}px`;
        //console.log(e.offsetX)
    });
}

const deleteCursor = (wrapper, cursor) =>{
    wrapper.addEventListener('click', (e)=>{
        cursor.remove();
        resetHandlers()
    })
};
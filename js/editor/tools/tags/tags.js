import { getColor, randomColor } from "../colorPicker/colorPicker.js";

const initTags = () => {
    const color = randomColor();
    const initTag = `
    <div id='tags' class='containers'>
        <h4>Tags</h4>
        <div class='dropdown tag_container'>
            <div id='init_tag' class='tag_label' style='background: rgb(${color.r},${color.g},${color.b});'>
                <p class='tag'>Tag</p>
            </div>
        </div>
    </div>
    `;
    document.querySelector('#editor').insertAdjacentHTML('beforeend', initTag)
}

const checkTags = (currentTag) =>{
    const tagsDom = document.querySelectorAll('.tag');
    let tagValues = [];
    tagsDom.forEach((tag)=>{
        tagValues.push(tag.value)
    });
    tagValues.contains(currentTag) ? '' : addTags(currentTag);

}

const addTags = (tag) =>{
    const color = randomColor()
    const count = document.querySelectorAll('.tag_container').children.length;
    const tags = `
    <div id='tag_${count}' class='tag_label' style='background: rgb(${color.r},${color.g},${color.b});'><p>${tag}</p></div>
    `;
}

export const tagsHandler = () => {
    const tagContainer = document.querySelector('#tags');
    if(tagContainer === null){
        initTags();
    } else {
        const inputTags = document.querySelectorAll('.answer_tag');
        inputTags.forEach((tag)=>{
            tag.addEventListener('change', (e)=>{
                checkTags(e.target.value);
            })
        })
    }
}
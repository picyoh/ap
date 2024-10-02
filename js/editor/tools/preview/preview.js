export const addPreview = (label, number) => {
  return `
    <div id='${label}_preview_${number}' class='preview'>
        <img id='${label}_preview_${number}_img' class='preview_img' />
    </div>
        `;
};

export const updatePreview = (label, number) =>{
    const input = document.querySelector(`#img_link_${number}`);
    input.addEventListener('change', (e)=>{
        document.querySelector(`#${label}_preview_${number}_img`).src = input.value;
    });
}

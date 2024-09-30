export const toogleDropdown = (label) =>{
            //TODO: check si .active remove sinon add
            const labelDom = document.querySelector(`#${label}_menu`);
            labelDom.classList.contains('active') ? labelDom.classList.remove('active') : labelDom.classList.add('active');
};
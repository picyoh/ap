export const createMenu = (label) => {
    let container = "";
    let content = "";
    label.menu.forEach((topic) => {
      if (topic.name === "file") {
        content = `
        <label for'${label.name}_${topic.name}'>Fichier:&nbsp</label>
        <input type='file' id='${label.name}_${topic.name}' name='${label.name}_${topic.name}' accept='application.json' />
        `;
      } else {
        content = `<i class="${topic.icon}"></i>`;
      }
      container += `<div id='${label.name}_${topic.name}_label' class='menu_labels'>${content}</div>`;
    });
    return `<div id='${label.name}_menu' class='menus drop-down visible=false'>${container}</div>`;
  };
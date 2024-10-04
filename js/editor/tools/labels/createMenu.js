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
        content = `
        <p class='menu_tooltip_text'>${topic.text}</p>
        <i class="${topic.icon}"></i>
        `;
      }
      container += `<div id='${label.name}_${topic.name}_label' class='menu_labels menu_tooltip'>${content}</div>`;
    });
    return `<div id='${label.name}_menu' class='menus drop-down'>${container}</div>`;
  };
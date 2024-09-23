export const createLabels = (labels) => {

  let labelHtml = "";
  const fas = [];
  labels.forEach((label) => {
    const labelTemplate = `
                  <div id='${label.name}Label' class='labels'>
                    <i class="fa-solid fa-${label.icon}"></i>
                    <p>${label.text}</p>
                  </div>
                  `;
    labelHtml += labelTemplate;
  });
  const tools = document.querySelector("#tools");
  tools.insertAdjacentHTML("afterbegin", labelHtml);
};

export const eraserLabelHandler = () => {
  const labelsDom = document.querySelectorAll(".labels");
  eraserLabel.addEventListener("click", (e) => {
    const labelId = e.target.id.replace('Label', '');
    console.log(labelId)
    switch (e.target.id) {
      case "eraserLabel":
        break;
      default:
        break;
    }
  });
};

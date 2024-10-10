export const eraseHandler = () => {
  const wrapper = document.querySelector("#wrapper");
  wrapper.addEventListener("click", (e) => {
    erase(e.target.id);
  });
};

const erase = (targetId) => {
  const element = document.querySelector(`#${targetId}`);
  const targetType = targetId.split("_")[0];
  //console.log(targetType);
  switch (targetType) {
    case "question":
      element.parentNode.parentNode.remove();
      break;
    case "answer":
    case "result":
    case "group":
      element.parentNode.remove();
      break;
    default:
      console.log("erase failed");
      break;
  }
  element.parentNode.remove();
};

export const pathClickHandler = () => {
  //TODO: rework to erase paths
  const paths = document.querySelectorAll(".paths");
  paths.forEach((path) => {
    path.addEventListener("click", (e) => {
      const split = path.id.split("_");
      const answerId = "answer_link_" + split[1];
      document.getElementById(answerId).click();
      //TODO: remove linked from classList and parents
      path.remove();
      removeCircle(`${split[1]}_${split[2]}`);
      removeCircle(`${split[2]}_${split[1]}`);
    });
  });
};
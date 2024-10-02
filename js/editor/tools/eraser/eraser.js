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

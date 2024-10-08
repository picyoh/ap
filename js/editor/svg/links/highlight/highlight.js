export const hightlightHandler = () => {
    const paths = document.querySelectorAll(".paths");
    paths.forEach((path) => {
      path.addEventListener("mouseover", (e) => {
        e.target.classList.add("highlightedPaths");
        highlightParentPath(e.target.id, true);
      });
      path.addEventListener("mouseleave", (e) => {
        e.target.classList.remove("highlightedPaths");
        highlightParentPath(e.target.id, false);
      });
    });
  };
  
  const highlightParentPath = (targetId, isOver) => {
    //console.log(targetId)
    const split = targetId.split("_");
    // get answer
    const answerNumber = split[1];
    // get parent question value
    const questionNumber = answerNumber.slice(0, 3);
    const questionParent = "question_parent_" + questionNumber;
    const parentValue = document.getElementById(questionParent).value;
    if (parentValue) {
      const splitNumber = parentValue.split("_")[1];
      const pathId = "path_" + splitNumber + "_" + questionNumber;
      //console.log(pathId);
      if (isOver) {
        document.getElementById(pathId).classList.add("highlightedPaths");
      } else {
        document.getElementById(pathId).classList.remove("highlightedPaths");
      }
      highlightParentPath(pathId, isOver);
    }
  };
export const getNumber = (targetId, isAnswerLink) => {
  //console.log(targetId);
  const targetSplit = targetId.split("_");
  let targetNumber;
  if (isAnswerLink) {
    // get answer container number
    targetNumber = `${targetSplit[1]}_${targetSplit[2]}`;
  } else {
    // get other container number
    const targetSplitLast = targetSplit.length - 1;
    targetNumber = targetSplit[targetSplitLast];
  }
  return targetNumber;
};

export const getElementNumber = (type) => {
  const elements = document.querySelectorAll(`.${type}`);
  return elements.length;
};

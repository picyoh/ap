export const getNumber = (targetId, isAnswer) => {
  //console.log(targetId);
  const targetSplit = targetId.split("_");
  let targetNumber;
  if (isAnswer) {
    // get answer container number
    targetNumber = `${targetSplit[1]}_${targetSplit[2]}_${targetSplit[3]}`;
  } else {
    // get other container number
    const targetSplitLast = targetSplit.length - 1;
    targetNumber = `${targetSplit[1]}_${targetSplit[2]}`;
  }
  return targetNumber;
};

export const getElementNumber = (type) => {
  const elements = document.querySelectorAll(`.${type}`);
  return elements.length;
};

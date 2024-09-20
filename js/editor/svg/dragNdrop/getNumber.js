export const getNumber = (targetId) => {
  //console.log(targetId);
  const targetSplit = targetId.split("_");
  const targetSplitLast = targetSplit.length - 1;
  const targetNumber = targetSplit[targetSplitLast];
  return targetNumber;
};
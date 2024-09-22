export const getGridStyle = () => {
  // get wrapper style
  const wrapperStyleDeclaration = document.styleSheets[0].cssRules[0].style;
  // get current grid template
  const currentGridTemp = wrapperStyleDeclaration.gridTemplateAreas;
  // split
  const splitted = currentGridTemp.split('"').filter((e) => e && e !== " ");
  // get row and column numbers
  const rowCount = parseInt(splitted.length - 1);
  const colCount = parseInt(splitted[0].split(" ").length - 1);
  // calc the number of container to add
  const totalCont = parseInt(rowCount * colCount - 1);

  const obj = {
    wrapper: wrapperStyleDeclaration,
    splitted: splitted,
    rowCount: rowCount,
    colCount: colCount,
    totalCont: totalCont,
  };

  return obj;
};

export const createNewTemplateLine = (colCount) => {
  const compar = "compar ";
  return `${compar.repeat(colCount)}contBtn`;
};

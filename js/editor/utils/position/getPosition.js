export const getElementPositions = (element) => {
  const wrapper = document.querySelector("#wrapper").getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  const currentLeft = (rect.left + rect.right) / 2 - wrapper.left;
  const currentTop = (rect.top + rect.bottom) / 2 - wrapper.top;
  return { x: currentLeft, y: currentTop };
};

export const getRelativePosition = (e) => {
  let pos = { x: 0, y: 0 };
  const wrapper = document.querySelector("#wrapper").getBoundingClientRect();
  pos.x = e.pageX - wrapper.left;
  pos.y = e.pageY - wrapper.top;
  return pos;
};

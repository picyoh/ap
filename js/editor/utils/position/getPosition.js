export const getPositions = (element) => {
    const wrapper = document.querySelector('#wrapper').getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const currentLeft = (rect.left + rect.right) / 2 - wrapper.left;
    const currentTop = (rect.top + rect.bottom) / 2 - wrapper.top;
    return {x : currentLeft, y : currentTop}
  };
  
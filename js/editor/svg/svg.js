export const initSvg = () => {
  const svg = `
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1"
    width= "100%"
    height= "100%"
    >
    </svg>`;
  const page = document.querySelector("#editor");
  page.insertAdjacentHTML("afterbegin", svg);
  //svgWindowHandler();
};

export const svgWindowHandler = () => {
  // resizing window case
  document.addEventListener("resize", (e) => {
    console.log("resize");
    resizeSvg();
  });
};

export const resizeSvg = () => {
  document.querySelector("svg").setAttribute("width", "100%");
  document.querySelector("svg").setAttribute("height", "100%");
};

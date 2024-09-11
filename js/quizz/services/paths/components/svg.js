import { hideLinkHandler } from "../linksHandlers.js";
import { pathHandler } from "../pathHandler.js";

export const initSvg = () => {
  const svg = `
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1"
    width= "100%"
    height= "100%"
    >
    </svg>`;
  const page = document.querySelector("body");
  page.insertAdjacentHTML("afterbegin", svg);
  // add hide path button
  const quizz = document.querySelector("#quizz");
  const hideLinkBtn = `<button id='hide_links'>Hide Links</button>`;
  quizz.insertAdjacentHTML("beforeend", hideLinkBtn);
  hideLinkHandler();
  svgWindowHandler();
};

export const svgWindowHandler = () => {
  // resizing window case 
  document.addEventListener('resize', (e) =>{
    console.log('resize')
    pathHandler();
    resizeSvg()
  });
}

export const resizeSvg = ()=>{
  const pageWidth = document
  document.querySelector('svg').setAttribute('width','100%');
  document.querySelector('svg').setAttribute('height','100%');
}

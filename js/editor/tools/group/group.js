import { resetHandlers } from "../../handlers.js";
import { getRelativePosition } from "../../utils/position/getPosition.js";
import { randomColor } from "../colorPicker/colorPicker.js";

let start = { x: 0, y: 0 };
let width = "1rem";
let height = "1rem";

export const setGroupStart = (e) => {
  setStartPos(e);
  addTempGroup(e);
  groupStretch(e);
};

export const sizing = (e) => {
  const pos = getRelativePosition(e);
  width = pos.x - start.x;
  height = pos.y - start.y;
  return {width, height};
};

const setStartPos = (e) => {
  const pos = getRelativePosition(e);
  start.x = pos.x;
  start.y = pos.y;
};

const groupStretch = (e) => {
  const tempGroup = e.target.querySelector('#temp_group');
  sizing(e);
  tempGroup.style.width = `${width}px`;
  tempGroup.style.height = `${height}px`;
  e.target.addEventListener("mousemove", groupStretch);
  e.target.addEventListener("click", addGroup);
};

const addTempGroup = (e) =>{
  const div = `<div id='temp_group' class='groups' style='top:${start.y}px; left:${start.x}px;'></div>`;
  e.target.insertAdjacentHTML("beforeend", div);
};

const addGroup = (e) => {
  sizing(e);
  const number = document.querySelectorAll(".groups").length;
  const color = randomColor();
  const group = `<div 
    id='group_${number}' 
    class='groups' 
    style='
      top:${start.y}px; 
      left:${start.x}px; 
      width:${width}px; 
      height:${height}px; 
      background: rgb(${color.r}, ${color.g}, ${color.b});'>
        <label for='group_tag_${number}'></label>
        <input type='text' id='group_tag_${number}' name='group_tag_${number}' class='group_tag' placeholder='Theme'/>
        <div class="grip" draggable='true'>
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <div id='group_content_${number}'class='group_content'></div>
  </div>`;
  e.target.insertAdjacentHTML("beforeend", group);
  document.querySelector("#temp_group").remove();
  e.target.style.cursor = 'pointer';
  resetHandlers();
};
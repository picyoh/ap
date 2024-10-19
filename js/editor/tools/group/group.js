import { resetHandlers } from "../../handlers.js";
import { getElementPositions, getRelativePosition } from "../../utils/position/getPosition.js";
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
};

const setStartPos = (e) => {
  const pos = getRelativePosition(e);
  start.x = pos.x;
  start.y = pos.y;
};

const groupStretch = (e) => {
  const tempGroup = e.target.querySelector('#temp_group');
  sizing(e);
  if(tempGroup !== null){
    tempGroup.style.width = `${width}px`;
    tempGroup.style.height = `${height}px`;
    e.target.addEventListener("mousemove", groupStretch);
    e.target.addEventListener("click", addGroupHandler);
  }
};

const addTempGroup = (e) =>{
  const div = `<div id='temp_group' class='groups' style='top:${start.y}px; left:${start.x}px;'></div>`;
  e.target.insertAdjacentHTML("beforeend", div);
};

const addGroupHandler = (e) =>{
  e.target.removeEventListener("mousemove", groupStretch);
  sizing(e);
  const pos = start;
  addGroup(pos);
  document.querySelector("#temp_group").remove();
  e.target.style.cursor = 'pointer';
  addToGroup();
  resetHandlers();
}

export const addGroup = (pos) => {
  const number = document.querySelectorAll(".groups").length;
  const color = randomColor();
  const group = `<div 
    id='group_${number}' 
    class='groups' 
    style='
      top:${pos.y}px; 
      left:${pos.x}px;
      background: rgb(${color.r}, ${color.g}, ${color.b});'>
        <label for='group_tag_${number}'></label>
        <input type='text' id='group_tag_${number}' name='group_tag_${number}' class='group_tag' placeholder='Theme'/>
        <div class="grip" draggable='true'>
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <div id='group_content_${number}'class='group_content'></div>
  </div>`;
  document.querySelector('#wrapper').insertAdjacentHTML("beforeend", group);
};

const addToGroup = () => {
  const groups = document.querySelectorAll(".groups");
  const group = groups[groups.length - 1];
  const containers = document.querySelectorAll('.containers');
  const end = {x:0, y:0};
  end.x = start.x + width;
  end.y = start.x + height;
  containers.forEach((container)=>{
    const contPos = getElementPositions(container);
    if(start.x <= contPos.x && start.y <= contPos.y && end.x >= contPos.x && end.y >= contPos.y){
      const groupContent = group.querySelector('.group_content');
      const clone = container.cloneNode(true);
      clone.style.position = 'relative';
      clone.style.top = '0';
      clone.style.left = '0';
      container.remove();
      groupContent.appendChild(clone);
    }
  });
  
}
import { resetHandlers } from "../../../handlers.js";
import { addPreview, updatePreview } from "../preview/preview.js";

export const addResult = (count, pos, color) => {
  const preview = addPreview("result", count);
  const result = `
        <div class='containers result_container' style="top: ${pos.y}px; left: ${pos.x}px; background: rgb(${color.r},${color.g},${color.b})">
          <div class="links">
            <div id="link_${count}" class="link_circle link_top"></div>
          </div>
          <div class="grip"><i class="fa-solid fa-grip-vertical"></i></div>
          <div id='result_${count}' class='result'>
            <label for='result_text_${count}'>Name :</label>
            <input type='text' id='result_text_${count}' name='result_${count}' placeHolder='Result ${count}'>
            <label for='img_link_${count}'>Image link :</label>
            <input type='text' id='img_link_${count}' name='img_link_${count}' class='img_link' placeholder='https://'>
            <label for='aff_link_${count}'>Affiliate link :</label>
            <input type='text' id='aff_link_${count}' name='aff_link_${count}' class='aff_link' placeholder='https://'>
            <label for='value_${count}'>Value :</label>
            <input type='range' id='value_${count}' name='value_${count}' list='tickmarks' min='0' max='10'>
            <label for='tags_${count}'>Tags :</label>
            <output class='tags__area' id='tags_${count}' data-drop-target='true'></output>
            <input type='hidden' id='tags_${count}' name='tags_${count}'>
          </div>
          ${preview}
        </div>
        `;
  const wrapper = document.querySelector("#wrapper");
  wrapper.insertAdjacentHTML("beforeend", result);
  updatePreview("result", count);
  resetHandlers();
};

export const hideLinkHandler = () => {
  const btn = document.querySelector("#hide_links");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //TODO: toogle class instead of :
    const svgDom = document.querySelector("svg");
    if (svgDom.classList.contains("none")) {
      svgDom.classList.remove("none");
    } else {
      svgDom.classList.add("none");
    }
  });
};

import { downloadJson } from "../../submit/download.js";

export const resultToJson = (form) => {
  const data = new FormData(form);
  const encaps = { results: [] };

  let resultValue = {};
  let currentResult = 1;

  for (const element of data) {
    const split = element[0].split("_");
    const splitLength = split.length - 1;
    const numRow = parseInt(split[splitLength]);
    const type = split[0];

    if (currentResult !== numRow) {
      encaps.results.push(resultValue);
      currentResult = numRow;
      resultValue = {};
    } else {
      switch (type) {
        case "result":
          resultValue.name = element[1];
          break;
        case "img":
          resultValue.imgSrc = element[1];
          break;
        case "aff":
          resultValue.affLink = element[1];
          break;
        case "value":
          resultValue.value = element[1];
          break;
        case "tags":
          const children = [];
          const outputChildren = document.getElementById(element[0]).children;
          for (const child of outputChildren) {
            children.push(child.id.split("__")[1]);
          }
          resultValue.tags = children;
          break;
        default:
          console.log("err switch result gen");
      }
    }
  }
  encaps.results.push(resultValue);
  // stringify
  const json = JSON.stringify(encaps);
  const filename = "results.json";
  downloadJson(filename, json);
};

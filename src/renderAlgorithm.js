import { algorithms } from "./algorithmData.js";

const title = document.getElementById("title");
const description = document.getElementById("description");
const category = document.getElementById("category");
const level = document.getElementById("level");
const approach = document.getElementById("approach");
const spaceComp = document.getElementById("spaceComp");
const bestCase = document.getElementById("bestCase");
const averageCase = document.getElementById("averageCase");
const worstCase = document.getElementById("worstCase");

export function renderAlgo() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.addEventListener("click", (e) => {
    loadData(e.target.id);
  });
}

function loadData(algoName) {
  const algoData = algorithms[algoName];
  title.innerText = algoData.title;
  description.innerText = algoData.description;
  category.innerText = algoData.category;
  level.innerText = algoData.level;
  approach.innerText = algoData.approach;
  spaceComp.innerText = algoData.spaceComp;
  bestCase.innerText = algoData.bestCase;
  averageCase.innerText = algoData.averageCase;
  worstCase.innerText = algoData.worstCase;
}

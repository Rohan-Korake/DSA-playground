import { algorithms } from "../data/algorithmData.js";
import { navigateToAlgorithm } from "./router.js";

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
    const cardButton = e.target.closest(".try-button");
    if (cardButton) {
      navigateToAlgorithm(cardButton.id);
    }
  });
}

let selectedAlgo;
export function loadData(algoName) {
  const algoData = algorithms[algoName];
  if (!algoData) return;
  selectedAlgo = algoName;
  title.innerText = algoData.title;
  description.innerText = algoData.description;
  category.innerText = algoData.category;
  level.innerText = algoData.difficulty;
  approach.innerText = algoData.approach;
  spaceComp.innerText = algoData.space;
  bestCase.innerText = algoData.time.best;
  averageCase.innerText = algoData.time.average;
  worstCase.innerText = algoData.time.worst;
}

export { selectedAlgo };

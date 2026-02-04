import { selectedAlgo } from "./renderAlgorithm.js";
import { sortingMethod } from "./sorting.js";
import { searchingMethod } from "./searching.js";
import { simulationMethod } from "./simulation.js";
import { resetStepCount } from "./sorting.js";

export let isTerminated = false;

export function controller() {
  const start = document.getElementById("start");
  const random = document.getElementById("random");
  const reset = document.getElementById("reset");
  const algorithmVisualizer = document.getElementById("algorithmVisualizer");
  const inputBox = document.getElementById("inputBox");
  const executionStepContianer = document.getElementById(
    "executionStepContianer",
  );
  const executionStep = document.getElementById("executionStep");
  let cardId = 0;
  // handle start button functionality
  start.addEventListener("click", function () {
    cardId = 0;
    isTerminated = false;
    executionStep.innerHTML = "";
    algorithmVisualizer.innerHTML = "";
    resetStepCount();
    const inputBox = document.getElementById("inputBox").value;
    const numbers = inputBox.split(" ").map(Number);

    if (inputBox === "") {
      alert("Enter input numbers!");
      return;
    }

    for (let num of numbers) {
      if (num <= 0) {
        alert("Enter positive numbers!");
        algorithmVisualizer.innerHTML = "";
        return;
      }
      createBlock(num);
    }
    executionStepContianer.style.display = "block";
    startVisualization();
  });

  // handle reset button event
  reset.addEventListener("click", function () {
    inputBox.value = "";
    isTerminated = true;
    executionStep.innerHTML = "";
    algorithmVisualizer.innerHTML = "";
    executionStepContianer.style.display = "none";
  });

  // handle random value button
  random.addEventListener("click", function () {
    isTerminated = true;
    cardId = 0;
    algorithmVisualizer.innerHTML = "";
    executionStepContianer.style.display = "none";

    const arr = [];
    const inputBox = document.getElementById("inputBox");
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
      inputBox.value = arr.join(" ");
    }
  });

  function createBlock(ele) {
    const box = document.createElement("div");
    box.className = "box";
    box.id = cardId += 1;
    box.innerText = ele;
    algorithmVisualizer.appendChild(box);
  }
}

//assign correct algorithm process
function startVisualization() {
  if (
    selectedAlgo == "bubbleSort" ||
    selectedAlgo == "selectionSort" ||
    selectedAlgo == "insertionSort" ||
    selectedAlgo == "mergeSort" ||
    selectedAlgo == "quickSort"
  ) {
    sortingMethod(selectedAlgo);
    return;
  }
  if (selectedAlgo == "linearSearch" || selectedAlgo == "binarySearch") {
    searchingMethod(selectedAlgo);
    return;
  }
  if (selectedAlgo == "stackSimulation" || selectedAlgo == "queueSimulation") {
    simulationMethod(selectedAlgo);
  }
}

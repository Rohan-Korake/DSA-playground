import { selectedAlgo } from "./renderAlgorithm.js";
import { sortingMethod } from "./sorting.js";
import { searchingMethod } from "./searching.js";
import { simulationMethod } from "./simulation.js";

export function controller() {
  const start = document.getElementById("start");
  const random = document.getElementById("random");
  const stop = document.getElementById("stop");
  const algorithmVisualizer = document.getElementById("algorithmVisualizer");
  let cardId = 0;

  // handle start button functionality
  start.addEventListener("click", function () {
    cardId = 0;
    algorithmVisualizer.innerHTML = "";
    const inputBox = document.getElementById("inputBox").value;
    // convert string → array of numbers
    const numbers = inputBox.split(" ").map(Number);
    if (inputBox == "") {
      alert("Enter input numbers!");
      return;
    } else {
      numbers.forEach((num) => {
        if (num > 0) {
          createBlock(num);
        } else {
          alert("Enter positive numbers!");
          return;
        }
      });
    }
    startVisualization();
  });

  // handle stop button event
  stop.addEventListener("click", function () {
    const card1 = document.getElementById("1");
    const card2 = document.getElementById("2");

    card1.classList.add("swapLeft");
    card2.classList.add("swapRight");
  });

  // handle random value button
  random.addEventListener("click", function () {
    cardId = 0;
    algorithmVisualizer.innerHTML = "";
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

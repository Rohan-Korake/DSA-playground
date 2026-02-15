import { selectedAlgo } from "./renderAlgorithm.js";
import { sortingMethod } from "./sorting.js";
import { searchingMethod } from "./searching.js";
import { simulationMethod } from "./simulation.js";

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
  let cardId = 0,
    isExecuting = false;

  // handle start button functionality
  start.addEventListener("click", function () {
    if (isExecuting) return;
    cardId = 0;
    isExecuting = true;
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
    start.disabled = true;
    startVisualization();
  });

  // handle reset button event
  reset.addEventListener("click", function () {
    inputBox.value = "";
    isExecuting = false;
    isTerminated = true;
    executionStep.innerHTML = "";
    resetAlgorithmState();
  });

  // handle random value button
  random.addEventListener("click", function () {
    isExecuting = false;
    isTerminated = true;
    cardId = 0;
    resetAlgorithmState();

    const arr = [];
    const inputBox = document.getElementById("inputBox");
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
      inputBox.value = arr.join(" ");
    }
  });

  //generate element boxes
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

// handle copy button event
copyBtn.addEventListener("click", async function () {
  const container = document.getElementById("executionStepContianer");

  if (!container || container.innerText.trim() === "") {
    alert("Nothing to copy!");
    return;
  }

  try {
    await navigator.clipboard.writeText(container.innerText);
    copyBtn.innerText = "Copied!";

    setTimeout(() => {
      copyBtn.innerHTML = `<i class="fa-regular fa-clone"></i>`;
    }, 1500);
  } catch (err) {
    alert("Copy failed!");
  }
});

export function resetAlgorithmState() {
  const algorithmVisualizer = document.getElementById("algorithmVisualizer");
  const inputBox = document.getElementById("inputBox");
  const executionStep = document.getElementById("executionStep");
  const executionStepContianer = document.getElementById(
    "executionStepContianer",
  );
  const workingStatus = document.getElementById("workingStatus");
  inputBox.value = "";
  algorithmVisualizer.innerHTML = "";
  executionStep.innerHTML = "";
  executionStepContianer.style.display = "none";
  isTerminated = true;
  workingStatus.innerText = "Ready to Start";
}

// Update execution step
const executionStep = document.getElementById("executionStep");
let stepCount = -1;
export function updateExecutionSteps(
  numbers,
  action,
  type,
  operand1,
  operand2,
) {
  stepCount++;
  const stepAction = document.createElement("div");
  stepAction.className = "action";

  if (action === "Start" || action === "Stop") {
    stepAction.innerText = `${action} ${type}`;
    updateWorkingStatus(action, type);
  }

  if (action === "Compare") {
    stepAction.innerText = `Step ${stepCount} : Compare ${operand1} and ${operand2}`;
    updateWorkingStatus("Compare", "sorting", operand1, operand2);
  }

  if (action === "Swap") {
    stepAction.innerText = `Step ${stepCount} : Swap ${operand1} and ${operand2}`;
    updateWorkingStatus("Swap", "sorting", operand1, operand2);
  }

  if (action === "Shift") {
    stepAction.innerText = `Step ${stepCount} : Shift ${operand1} to Right`;
    updateWorkingStatus("Shift", "sorting", operand1, operand2);
  }

  if (action === "Insert") {
    stepAction.innerText = `Step ${stepCount} : Insert ${operand1}`;
  }

  if (action === "Divide") {
    stepAction.innerText = `Step ${stepCount} : Divide ${operand1}`;
    updateWorkingStatus("Dividing", operand1);
  }

  if (action === "Merge") {
    stepAction.innerText = `Step ${stepCount} : Merge ${operand1}`;
    updateWorkingStatus("Merging", operand1);
  }

  if (action === "Place") {
    stepAction.innerText = `Step ${stepCount} : Place ${operand1}`;
    updateWorkingStatus("Placed", operand1);
  }

  if (action == "Select Key") {
    stepAction.innerText = `Step ${stepCount} : ${action} ${type}`;
    updateWorkingStatus("Select Key", type);
  }
  const stepValue = document.createElement("div");
  stepValue.className = "value";
  stepValue.innerText = numbers.join("   |   ");

  executionStep.appendChild(stepAction);
  executionStep.appendChild(stepValue);
  executionStep.appendChild(document.createElement("br"));
}

// Update working status
const workingStatus = document.getElementById("workingStatus");
export function updateWorkingStatus(action, type, operand1, operand2) {
  if (operand1 == null && operand2 == null) {
    workingStatus.innerText = `${action} ${type}`;
    return;
  }
  if (action === "Shift") {
    workingStatus.innerText = `${action} ${operand1} to Right`;
    return;
  }

  if (action === "Pivot Selected") {
    workingStatus.innerText = `${action} ${operand1}`;
    return;
  }

  if (action === "Dividing") {
    workingStatus.innerText = `Dividing Array ${type}`;
    return;
  }

  if (action === "Merging") {
    workingStatus.innerText = ` Merging ${type}`;
    return;
  }

  if (action === "Placed") {
    workingStatus.innerText = ` Placed ${type}`;
    return;
  }

  workingStatus.innerText = `${action} ${operand1} & ${operand2}`;
}

// Reset step counter
function resetStepCount() {
  stepCount = -1;
}

// Sleep helper
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Swap visual with pre-swap numbers
export async function swapVisual(numbers, boxes, i, j) {
  if (isTerminated) return;

  // Swap numbers
  let temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;

  updateExecutionSteps(numbers, "Swap", "Sorting", numbers[i], numbers[j]);

  boxes[i].innerText = numbers[i];
  boxes[j].innerText = numbers[j];
}

// Show execution complete
export function showTermination(boxes, numbers) {
  updateWorkingStatus("Stop", "sorting");
  updateExecutionSteps(numbers, "Stop", "Sorting");

  boxes.forEach((box) => {
    if (isTerminated) return;
    box.classList.add("sorted");
  });
}

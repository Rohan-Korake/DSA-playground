import { selectedAlgo } from "./renderAlgorithm.js";
import { sortingMethod } from "./sorting.js";
import { searchingMethod } from "./searching.js";
import { simulationMethod } from "./simulation.js";
import { algorithms } from "./algorithmData.js";
export let isTerminated = false;

export let cardId = 0,
  isExecuting = false;
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

  // handle start button functionality
  start.addEventListener("click", function () {
    const inputValue = document.getElementById("inputBox").value.trim();
    const targetValue = document.getElementById("inputTarget").value.trim();

    const searchAlgos = ["linearSearch", "binarySearch"];

    if (inputValue === "") {
      alert("Enter input numbers!");
      return;
    }

    const validPattern = /^[0-9]+( [0-9]+)*$/;

    if (!validPattern.test(inputValue)) {
      alert("Enter only positive numbers separated by single space!");
      return;
    }

    const numbers = inputValue.split(" ").map(Number);

    for (let num of numbers) {
      if (num <= 0) {
        alert("Enter positive numbers only!");
        isTerminated = true;
        return;
      }
    }

    if (searchAlgos.includes(selectedAlgo)) {
      if (targetValue === "") {
        alert("Enter target element!");
        return;
      }

      if (!/^[0-9]+$/.test(targetValue)) {
        alert("Target must be a positive number!");
        return;
      }
    }

    if (isExecuting) return;

    cardId = 0;
    isExecuting = true;
    isTerminated = false;
    executionStep.innerHTML = "";
    algorithmVisualizer.innerHTML = "";
    resetStepCount();

    for (let num of numbers) {
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
}

//generate element boxes
export function createBlock(ele) {
  const box = document.createElement("div");
  box.className = "box";
  box.id = cardId += 1;
  box.innerText = ele;
  algorithmVisualizer.appendChild(box);
}

export function insertElement(ele) {
  const box = document.createElement("div");
  box.className = "box";
  box.id = cardId += 1;
  box.innerText = ele;
  algorithmVisualizer.prepend(box);
  return box;
}

export function removeBlock(type) {
  console.log(algorithmVisualizer);
  if (type == "Queue") {
    algorithmVisualizer.removeChild(algorithmVisualizer.firstElementChild);
  } else if (type == "Stack") {
    algorithmVisualizer.removeChild(algorithmVisualizer.lastElementChild);
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
  isTerminated = true;
  document.getElementById("algorithmVisualizer").innerHTML = "";
  document.getElementById("inputBox").value = "";
  document.getElementById("executionStep").innerHTML = "";
  document.getElementById("executionStepContianer").style.display = "none";
  document.getElementById("workingStatus").innerText = "Ready to Start";
  document.getElementById("inputTarget").value = "";
  document.getElementById("operationControls").style.display = "none";
  document.querySelector(
    ".algorithm-visualizer-container",
  ).style.flexDirection = "row";
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

  if (action === "Start" || action === "Stop" || action === "Sorting") {
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

  if (action == "Pivot") {
    stepAction.innerText = `Step ${stepCount} : Pivot Selected ${operand1}`;
    updateWorkingStatus("Pivot Selected", "", operand1);
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

  if (action == "Check") {
    stepAction.innerText = `Step ${stepCount} : Comapre ${numbers[type]} with ${operand1} & mid = ${type}`;
    updateWorkingStatus("Compare", "sorting", numbers[type], operand1);
  }

  if (action == "Target") {
    stepAction.innerText = `Start Searching with ${action} Element ${type} `;
    updateWorkingStatus(action, type);
  }

  if (action == "Found") {
    stepAction.innerText = `Step ${stepCount} : Element ${numbers[type]} found at index ${type}`;
    updateWorkingStatus(action, type);
  }

  if (action == "NotFound") {
    stepAction.innerText = `Step ${stepCount} : Target not found. Return value -1`;
    updateWorkingStatus(action, "-1");
  }

  if (action == "low") {
    stepAction.innerText = `Step ${stepCount}: ${numbers[operand1]} < ${operand2}, so Low + 1 = ${type}`;
    updateWorkingStatus(action, type);
  }

  if (action == "high") {
    stepAction.innerText = `Step ${stepCount} : ${numbers[operand1]} > ${operand2}, so high = mid - 1 = ${type}`;
    updateWorkingStatus(action, type);
  }

  if (action == "Push" || action == "Pop") {
    stepAction.innerText = `Step ${stepCount + 1} : ${action} ${operand1} at Top ${type}`;
    updateWorkingStatus(action, operand1);
  }

  if (action == "Enqueue" || action == "Dequeue") {
    stepAction.innerText = `Step ${stepCount + 1} : ${action} ${type}, Front ${operand1} & Rear ${operand2}`;
    updateWorkingStatus(action, type);
  }

  if (action == "Underflow" || action == "Overflow") {
    stepAction.innerText = `Step ${stepCount + 1} : ${type} ${action} Size ${operand1}`;
    updateWorkingStatus(action, operand1);
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
function updateWorkingStatus(action, type, operand1, operand2) {
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

  if (action == "Found") {
    workingStatus.innerText = `Element Found at index ${type}`;
    return;
  }

  if (action == "NotFound") {
    workingStatus.innerText = `Element Not found returns ${type}`;
    return;
  }

  if (action == "low") {
    workingStatus.innerText = `Mid < Target, so Low + 1 = ${type}`;
    return;
  }

  if (action == "high") {
    workingStatus.innerText = `Mid > Target, so Low - 1 = ${type}`;
    return;
  }

  if (operand1 == null && operand2 == null) {
    workingStatus.innerText = `${action} ${type}`;
    return;
  }
  workingStatus.innerText = `${action} ${operand1} & ${operand2}`;
}

// Reset step counter
export function resetStepCount() {
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

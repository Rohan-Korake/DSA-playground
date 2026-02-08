import { isTerminated } from "./controller.js";

export async function sortingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "bubbleSort") await bubbleSort(numbers, boxes);
  if (selectedAlgo === "selectionSort") await selectionSort(numbers, boxes);
  if (selectedAlgo === "insertionSort") await insertionSort(numbers, boxes);
  if (selectedAlgo === "quickSort") await quickSort(numbers, boxes);
}

// Bubble Sort
async function bubbleSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      boxes[j].classList.add("compare");
      boxes[j + 1].classList.add("compare");

      await sleep(1000);
      if (isTerminated) return;

      updateExecutionSteps(
        numbers,
        "Compare",
        "Sorting",
        numbers[j],
        numbers[j + 1],
      );

      if (numbers[j] > numbers[j + 1]) {
        await swapVisual(numbers, boxes, j, j + 1);
      }

      boxes[j].classList.remove("compare");
      boxes[j + 1].classList.remove("compare");
    }
  }
  showTermination(boxes, numbers);
}

// Selection Sort
async function selectionSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  for (let i = 0; i < numbers.length - 1; i++) {
    let minIndex = i;
    boxes[i].classList.add("current");

    for (let j = i + 1; j < numbers.length; j++) {
      boxes[minIndex].classList.add("compare");
      boxes[j].classList.add("compare");

      updateExecutionSteps(
        numbers,
        "Compare",
        "Sorting",
        numbers[j],
        numbers[minIndex],
      );
      await sleep(1000);
      if (isTerminated) return;

      if (numbers[j] < numbers[minIndex]) {
        boxes[minIndex].classList.remove("compare");
        minIndex = j;
      }
      boxes[j].classList.remove("compare");
    }

    boxes[minIndex].classList.remove("compare");

    if (minIndex !== i) {
      await swapVisual(numbers, boxes, i, minIndex);
      await sleep(600);
    }

    boxes[i].classList.remove("current");
    boxes[i].classList.add("sorted");
    if (isTerminated) return;
  }
  showTermination(boxes, numbers);
}

// Insertion Sort
async function insertionSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  for (let i = 1; i < numbers.length; i++) {
    let key = numbers[i];
    let j = i - 1;

    boxes[i].classList.add("select-key");
    updateWorkingStatus("Select Key", key);

    await sleep(800);
    updateExecutionSteps(numbers, "Compare", "Sorting", numbers[j], key);

    while (j >= 0 && numbers[j] > key) {
      boxes[j].classList.add("compare");
      boxes[j + 1].classList.add("compare");

      await sleep(800);
      if (isTerminated) return;

      updateExecutionSteps(numbers, "Shift", "Sorting", numbers[j], null);
      numbers[j + 1] = numbers[j];
      boxes[j + 1].innerText = numbers[j];

      boxes[j].classList.remove("compare");
      boxes[j + 1].classList.remove("compare");
      j--;
    }

    updateExecutionSteps(numbers, "Insert", "Sorting", key, j + 1);
    numbers[j + 1] = key;
    boxes[j + 1].innerText = key;

    boxes[i].classList.remove("select-key");
    boxes[j + 1].classList.add("sorted");

    await sleep(600);
  }
  showTermination(boxes, numbers);
}

// Quick Sort
async function quickSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  let stack = [];
  stack.push([0, numbers.length - 1]);

  while (stack.length > 0) {
    let [low, high] = stack.pop();

    if (low < high) {
      let pivot = await partition(numbers, boxes, low, high);
      stack.push([low, pivot - 1]);
      stack.push([pivot + 1, high]);
    }
  }
  showTermination(boxes, numbers);

  // Partition function
  async function partition(numbers, boxes, low, high) {
    let pivot = numbers[high];
    boxes[high].classList.add("pivot");
    let i = low - 1;

    for (let j = low; j < high; j++) {
      boxes[j].classList.add("compare");
      updateExecutionSteps(numbers, "Compare", "Sorting", numbers[j], pivot);
      await sleep(1000);

      if (numbers[j] <= pivot) {
        i++;
        await swapVisual(numbers, boxes, i, j);
      }

      boxes[j].classList.remove("compare");
    }

    await swapVisual(numbers, boxes, i + 1, high);
    boxes[high].classList.remove("pivot");
    return i + 1;
  }
}

// Reset step counter
export function resetStepCount() {
  stepCount = -1;
}

// Sleep helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Update execution step
const executionStep = document.getElementById("executionStep");
let stepCount = -1;
function updateExecutionSteps(numbers, action, type, operand1, operand2) {
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
  }

  if (action === "Shift") {
    stepAction.innerText = `Step ${stepCount} : Shift ${operand1} to Right`;
  }

  if (action === "Insert") {
    stepAction.innerText = `Step ${stepCount} : Insert ${operand1}`;
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
  if (operand1 == null && operand2 == null) {
    workingStatus.innerText = `${action} ${type}`;
    return;
  }
  if (action === "Shift") {
    workingStatus.innerText = `${action} ${operand1} to Right`;
    return;
  }
  workingStatus.innerText = `${action} ${operand1} & ${operand2}`;
}

// Swap visual with pre-swap numbers
async function swapVisual(numbers, boxes, i, j) {
  if (isTerminated) return;

  let valI = numbers[i];
  let valJ = numbers[j];

  // Swap numbers
  let temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;

  updateExecutionSteps(numbers, "Swap", "Sorting", valI, valJ);
  updateWorkingStatus("Swap", "sorting", valI, valJ);

  boxes[i].innerText = numbers[i];
  boxes[j].innerText = numbers[j];
}

// Show execution complete
function showTermination(boxes, numbers) {
  updateWorkingStatus("Stop", "sorting");
  updateExecutionSteps(numbers, "Stop", "Sorting");

  boxes.forEach((box) => {
    if (isTerminated) return;
    box.classList.add("sorted");
  });
}

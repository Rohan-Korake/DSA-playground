import { isTerminated } from "./controller.js";

export async function sortingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "bubbleSort") {
    await bubbleSort(numbers, boxes);
  }

  if (selectedAlgo === "selectionSort") {
    await selectionSort(numbers, boxes);
  }

  if (selectedAlgo === "insertionSort") {
    await insertionSort(numbers, boxes);
  }
}

// handle bubble sort visualization
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

      if (isTerminated) return;
      boxes[j].classList.remove("compare");
      boxes[j + 1].classList.remove("compare");
    }
  }
  showTermination(boxes, numbers);
}

// handle selection sort visualization
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
      updateExecutionSteps(
        numbers,
        "Swap",
        "Sorting",
        numbers[i],
        numbers[minIndex],
      );
      await swapVisual(numbers, boxes, i, minIndex);
    }

    boxes[i].classList.remove("current");
    boxes[i].classList.add("sorted");
    if (isTerminated) return;
  }
  showTermination(boxes, numbers);
}

// handle insertion sort visualization
async function insertionSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  for (let i = 1; i < numbers.length; i++) {
    let key = numbers[i];
    let j = i - 1;

    // select key
    boxes[i].classList.add("select-key");
    updateWorkingStatus("Select Key", key);
    await sleep(800);
    updateExecutionSteps(numbers, "Compare", "Sorting", numbers[j], key);

    while (j >= 0 && numbers[j] > key) {
      boxes[j].classList.add("compare");
      boxes[j + 1].classList.add("compare");

      await sleep(800);
      if (isTerminated) return;

      // shift right
      updateExecutionSteps(numbers, "Shift", "Sorting", numbers[j], null);
      numbers[j + 1] = numbers[j];
      boxes[j + 1].innerText = numbers[j];

      boxes[j].classList.remove("compare");
      boxes[j + 1].classList.remove("compare");

      j--;
    }

    // insert key
    updateExecutionSteps(numbers, "Insert", "Sorting", key, j + 1);
    numbers[j + 1] = key;
    boxes[j + 1].innerText = key;

    boxes[i].classList.remove("select-key");
    boxes[j + 1].classList.add("sorted");

    await sleep(600);
  }

  showTermination(boxes, numbers);
}

// update the executed step in execution box
const executionStep = document.getElementById("executionStep");
let stepCount = -1;
function updateExecutionSteps(numbers, action, type, operand1, operand2) {
  stepCount++;

  const stepAction = document.createElement("div");
  stepAction.className = "action";

  if (action == "Start" || action == "Stop") {
    stepAction.innerText = `${action} ${type}`;
  }

  if (action == "Compare") {
    stepAction.innerText = `Step ${stepCount} : Compare ${operand1} and ${operand2}`;
  }

  if (action == "Swap") {
    stepAction.innerText = `Step ${stepCount} : Swap ${operand1} and ${operand2}`;
  }

  if (action == "Shift") {
    stepAction.innerText = `Step ${stepCount} : Shift ${operand1} to Right`;
  }

  if (action == "Insert") {
    stepAction.innerText = `Step ${stepCount} : Insert ${operand1}`;
  }

  const stepValue = document.createElement("div");
  stepValue.className = "value";
  stepValue.innerText = numbers.join("   |   ");

  executionStep.appendChild(stepAction);
  executionStep.appendChild(stepValue);
  executionStep.appendChild(document.createElement("br"));
}

// update woking status of process
const workingStatus = document.getElementById("workingStatus");
function updateWorkingStatus(action, type, operand1, operand2) {
  if (operand1 == null && operand2 == null) {
    workingStatus.innerText = `${action} ${type}`;
    return;
  }

  if (action == "Shift") {
    workingStatus.innerText = `${action} ${operand1} to Right`;
    return;
  }

  workingStatus.innerText = `${action} ${operand1} & ${operand2}`;
}

// reset the step counter
export function resetStepCount() {
  stepCount = -1;
}

// Common sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// handle swapping process
async function swapVisual(numbers, boxes, i, j) {
  if (isTerminated) return;

  let temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
  updateExecutionSteps(numbers, "Swap", "Sorting", numbers[i], numbers[j]);

  boxes[i].innerText = numbers[i];
  boxes[j].innerText = numbers[j];
}

//Show exeution complete state
function showTermination(boxes, numbers) {
  updateExecutionSteps(numbers, "Stop", "Sorting");
  boxes.forEach((box) => {
    if (isTerminated) return;
    box.classList.add("sorted");
  });
}

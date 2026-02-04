import { isTerminated } from "./controller.js";

export async function sortingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "bubbleSort") {
    await bubbleSort(numbers, boxes);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swapVisual(numbers, boxes, i, j) {
  if (isTerminated) return;

  let temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
  updateExecutionSteps(numbers, "Swap", "Sorting", numbers[i], numbers[j]);

  boxes[i].innerText = numbers[i];
  boxes[j].innerText = numbers[j];
}

async function bubbleSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting", null, null);
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
  updateExecutionSteps(numbers, "Stop", "Sorting", null, null);
  boxes.forEach((box) => {
    if (isTerminated) return;
    box.classList.add("sorted");
  });
}

const executionStep = document.getElementById("executionStep");
let stepCount = -1;
function updateExecutionSteps(numbers, action, type, operand1, operand2) {
  stepCount++;
  const stepAction = document.createElement("div");
  stepAction.className = "action";
  if (action == "Start" || action == "Stop") {
    stepAction.innerText = `${action}  ${type}`;
  }
  if (action == "Compare") {
    stepAction.innerText = `Step ${stepCount} : ${action}  ${operand1} and ${operand2}`;
  }
  if (action == "Swap") {
    stepAction.innerText = `Step ${stepCount} : ${action}  ${operand1} and ${operand2}`;
  }
  if (
    action == "Start" ||
    action == "Stop" ||
    action == "Compare" ||
    action == "Swap"
  ) {
    const stepValue = document.createElement("div");
    stepValue.className = "value";
    stepValue.innerText = numbers.join(" ");

    executionStep.appendChild(stepAction);
    executionStep.appendChild(stepValue);
    executionStep.appendChild(document.createElement("br"));
  } else {
    return;
  }
}

export function resetStepCount() {
  stepCount = -1;
}

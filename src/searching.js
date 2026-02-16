import {
  updateExecutionSteps,
  isTerminated,
  sleep,
  resetStepCount,
} from "./controller.js";

export async function searchingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "binarySearch") await binarySearch(numbers, boxes);
  if (selectedAlgo === "linearSearch") await linearSearch(numbers, boxes);
}

async function binarySearch(numbers, boxes) {
  if (isTerminated) return;

  updateExecutionSteps(numbers, "Start", "Sorting for Binary Search");
  await sleep(2500);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        let temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
        boxes[j].innerText = numbers[j];
        boxes[j + 1].innerText = numbers[j + 1];
      }
    }
  }
  updateExecutionSteps(numbers, "Sorting", "Completed");
  resetStepCount();
  await sleep(1500);
  if (isTerminated) return;

  const tragetElement = document.getElementById("inputTarget").value;
  updateExecutionSteps(numbers, "Target", tragetElement);
  let low = 0,
    mid = 0;
  let high = numbers.length - 1;
  await sleep(2500);

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    updateExecutionSteps(numbers, "Check", mid, tragetElement);
    boxes[mid].classList.add("compare");
    await sleep(2500);

    if (numbers[mid] == tragetElement) {
      boxes[mid].classList.add("pivot");
      updateExecutionSteps(numbers, "Found", mid);
      return;
    } else if (numbers[mid] < tragetElement) {
      low = mid + 1;
      updateExecutionSteps(numbers, "low", low, mid, tragetElement);
      await sleep(2500);
    } else {
      high = mid - 1;
      updateExecutionSteps(numbers, "high", high, mid, tragetElement);
      await sleep(2500);
    }
    boxes[mid].classList.remove("compare");
  }
  updateExecutionSteps(numbers, "NotFound", mid);
}

async function linearSearch(numbers, boxes) {
  if (isTerminated) return;

  const tragetElement = document.getElementById("inputTarget").value;
  updateExecutionSteps(numbers, "Target", tragetElement);
  await sleep(2500);

  for (let i = 0; i < numbers.length; i++) {
    updateExecutionSteps(
      numbers,
      "Compare",
      "Searching",
      numbers[i],
      tragetElement,
    );
    boxes[i].classList.add("compare");

    await sleep(2500);

    if (numbers[i] == tragetElement) {
      boxes[i].classList.add("pivot");
      updateExecutionSteps(numbers, "Found", i);
      await sleep(2500);
      return;
    }
    boxes[i].classList.remove("compare");
  }
  updateExecutionSteps(numbers, "NotFound");
}

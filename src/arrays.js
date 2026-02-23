import {
  updateExecutionSteps,
  isTerminated,
  swapVisual,
  sleep,
  showTermination,
} from "./controller.js";

export async function arrays(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "oneDimensionalArray")
    await oneDimensionalArray(numbers, boxes);
}

async function oneDimensionalArray(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Traversing");
  await sleep(2500);

  for (let i = 0; i < numbers.length; i++) {
    boxes[i].classList.add("compare");
    updateExecutionSteps(numbers, "Access", "index", i, numbers[i]);
    await sleep(2500);
    boxes[i].classList.remove("compare");
  }
  updateExecutionSteps(numbers, "Stop", "Traversing");
}

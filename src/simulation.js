import {
  updateExecutionSteps,
  isTerminated,
  sleep,
  resetStepCount,
  insertElement,
  removeBlock,
} from "./controller.js";

export async function simulationMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "stackSimulation") await stackSimulation(numbers, boxes);
}

async function stackSimulation(numbers, boxes) {
  if (isTerminated) return;
  algorithmVisualizer.innerHTML = "";

  const insertBtn = document.getElementById("insertBtn");
  const removeBtn = document.getElementById("removeBtn");
  insertBtn.innerText = "Push";
  removeBtn.innerText = "Pop";
  document.getElementById("operationControls").style.display = "flex";
  document.querySelector(
    ".algorithm-visualizer-container",
  ).style.flexDirection = "column";

  let stack = [],
    stackPtr = -1,
    arrayPtr = 0;
  let len = numbers.length;

  insertBtn.addEventListener("click", function () {
    if (stackPtr + 1 == len) {
      updateExecutionSteps(stack, "Overflow", "Stack", stackPtr + 1);
      return;
    }

    stack.push(numbers[arrayPtr]);
    arrayPtr++;
    stackPtr++;
    let box = insertElement(stack[stackPtr]);
    box.style.width = "180px";
    updateExecutionSteps(stack, "Push", stackPtr, numbers[arrayPtr - 1]);
  });

  removeBtn.addEventListener("click", function () {
    if (stackPtr < 0) {
      updateExecutionSteps(stack, "Underflow", "Stack", stackPtr + 1);
      return;
    }

    stack.pop();
    updateExecutionSteps(stack, "Pop", stackPtr, numbers[arrayPtr - 1]);
    arrayPtr--;
    stackPtr--;
    removeBlock();
  });
}

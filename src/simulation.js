import {
  updateExecutionSteps,
  isTerminated,
  insertElement,
  removeBlock,
  createBlock,
  resetStepCount,
} from "./controller.js";

export async function simulationMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);

  if (selectedAlgo === "stackSimulation") await stackSimulation(numbers);
  if (selectedAlgo === "queueSimulation") await queueSimulation(numbers);
}

async function stackSimulation(numbers) {
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
    queuePtr = 0;
  let len = numbers.length;

  insertBtn.onclick = function () {
    if (stackPtr + 1 == len) {
      updateExecutionSteps(stack, "Overflow", "Stack", stackPtr + 1);
      return;
    }

    stack.push(numbers[queuePtr]);
    queuePtr++;
    stackPtr++;
    let box = insertElement(stack[stackPtr]);
    box.style.width = "180px";
    updateExecutionSteps(stack, "Push", stackPtr, numbers[queuePtr - 1]);
  };

  removeBtn.onclick = function () {
    if (stackPtr < 0) {
      updateExecutionSteps(stack, "Underflow", "Stack", stackPtr + 1);
      return;
    }

    stack.pop();
    updateExecutionSteps(stack, "Pop", stackPtr, numbers[queuePtr - 1]);
    queuePtr--;
    stackPtr--;
    removeBlock("Stack");
  };
}

async function queueSimulation(numbers) {
  if (isTerminated) return;
  algorithmVisualizer.innerHTML = "";

  const insertBtn = document.getElementById("insertBtn");
  const removeBtn = document.getElementById("removeBtn");
  insertBtn.innerText = "Enqueue";
  removeBtn.innerText = "Dequeue";
  document.getElementById("operationControls").style.display = "flex";

  let queue = [],
    frontPtr = -1,
    rearPrt = -1,
    queuePtr = 0;

  resetStepCount();
  const len = numbers.length;

  insertBtn.onclick = function () {
    if (rearPrt === len - 1) {
      updateExecutionSteps(queue, "Overflow", "Queue", len);
      return;
    }

    if (frontPtr === -1) frontPtr = 0;

    rearPrt++;
    queue[rearPrt] = numbers[queuePtr];
    createBlock(numbers[queuePtr]);

    updateExecutionSteps(
      queue,
      "Enqueue",
      numbers[queuePtr],
      frontPtr,
      rearPrt,
    );

    queuePtr++;
  };

  removeBtn.onclick = function () {
    if (frontPtr == -1 || frontPtr > rearPrt) {
      updateExecutionSteps(queue, "Underflow", "Queue", queuePtr);
      return;
    }

    updateExecutionSteps(queue, "Dequeue", queue[frontPtr], frontPtr, rearPrt);

    removeBlock("Queue");
    frontPtr++;
  };
}

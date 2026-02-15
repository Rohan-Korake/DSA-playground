import { isTerminated } from "./controller.js";

export async function searchingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "binarySearch") await binarySearch(numbers, boxes);
}

async function binarySearch(numbers, boxes) {
  if (isTerminated) return;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - 1; j++) {
      await sleep(1000);
      if (numbers[j] > numbers[j + 1]) {
        let temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
        boxes[j].innerText = numbers[j];
        boxes[j + 1].innerText = numbers[j + 1];
      }
    }
  }
}

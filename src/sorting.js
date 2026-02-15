import {
  updateWorkingStatus,
  updateExecutionSteps,
  isTerminated,
  swapVisual,
  sleep,
  showTermination,
} from "./controller.js";

export async function sortingMethod(selectedAlgo) {
  const inputBox = document.getElementById("inputBox").value;
  const numbers = inputBox.split(" ").map(Number);
  const boxes = document.querySelectorAll("#algorithmVisualizer .box");

  if (selectedAlgo === "bubbleSort") await bubbleSort(numbers, boxes);
  if (selectedAlgo === "selectionSort") await selectionSort(numbers, boxes);
  if (selectedAlgo === "insertionSort") await insertionSort(numbers, boxes);
  if (selectedAlgo === "quickSort") await quickSort(numbers, boxes);
  if (selectedAlgo === "mergeSort") await mergeSort(numbers, boxes);
}

// Bubble Sort
async function bubbleSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      boxes[j].classList.add("compare");
      boxes[j + 1].classList.add("compare");
      updateExecutionSteps(
        numbers,
        "Compare",
        "Sorting",
        numbers[j],
        numbers[j + 1],
      );

      await sleep(2500);
      if (isTerminated) return;

      if (numbers[j] > numbers[j + 1]) {
        await swapVisual(numbers, boxes, j, j + 1);
        await sleep(2500);
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
      await sleep(2500);
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
      await sleep(2500);
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
  await sleep(2500);

  for (let i = 1; i < numbers.length; i++) {
    if (isTerminated) return;

    let key = numbers[i];
    let j = i - 1;

    boxes[i].classList.add("select-key");
    updateExecutionSteps(numbers, "Select Key", key);

    await sleep(2500);

    while (j >= 0 && numbers[j] > key) {
      if (isTerminated) return;

      boxes[j].classList.add("compare");
      boxes[j + 1].classList.add("compare");

      updateExecutionSteps(numbers, "Compare", "Sorting", numbers[j], key);
      await sleep(2500);

      updateExecutionSteps(numbers, "Shift", "Sorting", numbers[j]);
      await sleep(2500);

      numbers[j + 1] = numbers[j];
      boxes[j + 1].innerText = numbers[j];

      await sleep(2500);

      boxes[j].classList.remove("compare");
      boxes[j + 1].classList.remove("compare");

      j--;
    }

    updateExecutionSteps(numbers, "Insert", "Sorting", key, j + 1);

    numbers[j + 1] = key;
    boxes[j + 1].innerText = key;

    boxes[i].classList.remove("select-key");

    await sleep(2500);
  }

  showTermination(boxes, numbers);
}

// Quick Sort
async function quickSort(numbers, boxes) {
  if (isTerminated) return;

  updateExecutionSteps(numbers, "Start", "Sorting");
  await sleep(2500);

  let stack = [];
  stack.push([0, numbers.length - 1]);

  while (stack.length > 0) {
    let [low, high] = stack.pop();

    if (low < high) {
      let pivotIndex = await partition(numbers, boxes, low, high);

      // Mark pivot as sorted
      boxes[pivotIndex].classList.remove("pivot");
      boxes[pivotIndex].classList.add("sorted");

      stack.push([low, pivotIndex - 1]);
      stack.push([pivotIndex + 1, high]);
    }
  }

  showTermination(boxes, numbers);
}

// Merge Sort
async function mergeSort(numbers, boxes) {
  if (isTerminated) return;
  updateExecutionSteps(numbers, "Start", "Sorting");
  await sleep(2500);

  await mergeSortHelper(numbers, boxes, 0, numbers.length - 1);
  showTermination(boxes, numbers);
}

//recursive funtion for merge sort
async function mergeSortHelper(numbers, boxes, left, right) {
  if (left >= right || isTerminated) return;

  let mid = Math.floor((left + right) / 2);

  // Highlight Left Part
  for (let i = left; i <= mid; i++) {
    boxes[i].classList.add("left-part");
  }
  updateExecutionSteps(numbers, "Divide", "Sorting", `Left [${left}-${mid}]`);
  await sleep(2500);
  if (isTerminated) return;

  // Recursively sort left
  await mergeSortHelper(numbers, boxes, left, mid);

  // Highlight Right Part
  for (let i = mid + 1; i <= right; i++) {
    boxes[i].classList.add("right-part");
  }
  updateExecutionSteps(
    numbers,
    "Divide",
    "Sorting",
    `Right [${mid + 1}-${right}]`,
  );
  await sleep(2500);
  if (isTerminated) return;

  // Recursively sort right
  await mergeSortHelper(numbers, boxes, mid + 1, right);

  // Merge the two halves
  await merge(numbers, boxes, left, mid, right);
}

//merage option for merge sort
async function merge(numbers, boxes, left, mid, right) {
  let leftPart = numbers.slice(left, mid + 1);
  let rightPart = numbers.slice(mid + 1, right + 1);

  let i = 0,
    j = 0,
    k = left;

  updateExecutionSteps(
    numbers,
    "Merge",
    "Sorting",
    `Merging [${left}-${mid}] & [${mid + 1}-${right}]`,
  );
  await sleep(2500);

  // Compare and merge
  while (i < leftPart.length && j < rightPart.length) {
    if (isTerminated) return;

    boxes[left + i].classList.add("compare");
    boxes[mid + 1 + j].classList.add("compare");

    updateExecutionSteps(
      numbers,
      "Compare",
      "Sorting",
      leftPart[i],
      rightPart[j],
    );
    await sleep(2500);

    boxes[left + i].classList.remove("compare");
    boxes[mid + 1 + j].classList.remove("compare");

    if (leftPart[i] <= rightPart[j]) {
      numbers[k] = leftPart[i];
      boxes[k].innerText = leftPart[i];
      boxes[k].classList.add("swap");
      updateExecutionSteps(numbers, "Place", "Sorting", leftPart[i]);
      await sleep(500);
      boxes[k].classList.remove("swap");
      i++;
    } else {
      numbers[k] = rightPart[j];
      boxes[k].innerText = rightPart[j];
      boxes[k].classList.add("swap");
      updateExecutionSteps(numbers, "Place", "Sorting", rightPart[j]);
      await sleep(500);
      boxes[k].classList.remove("swap");
      j++;
    }

    k++;
  }

  // Copy remaining left elements
  while (i < leftPart.length) {
    if (isTerminated) return;
    numbers[k] = leftPart[i];
    boxes[k].innerText = leftPart[i];
    boxes[k].classList.add("swap");
    updateExecutionSteps(numbers, "Place", "Sorting", leftPart[i]);
    await sleep(500);
    boxes[k].classList.remove("swap");
    i++;
    k++;
  }

  // Copy remaining right elements
  while (j < rightPart.length) {
    if (isTerminated) return;
    numbers[k] = rightPart[j];
    boxes[k].innerText = rightPart[j];
    boxes[k].classList.add("swap");
    updateExecutionSteps(numbers, "Place", "Sorting", rightPart[j]);
    await sleep(500);
    boxes[k].classList.remove("swap");
    j++;
    k++;
  }

  // Add sorted class to merged range
  for (let idx = left; idx <= right; idx++) {
    boxes[idx].classList.add("sorted");
    boxes[idx].classList.remove("left-part", "right-part");
  }
}

//partitioning module for insertion sort
async function partition(numbers, boxes, low, high) {
  let pivot = numbers[high];
  boxes[high].classList.add("pivot");

  updateWorkingStatus("Pivot Selected", "", pivot, "");
  await sleep(2500);

  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (isTerminated) return;

    boxes[j].classList.add("compare");

    updateExecutionSteps(numbers, "Compare", "Sorting", numbers[j], pivot);
    await sleep(2500);

    if (numbers[j] <= pivot) {
      i++;

      boxes[i].classList.add("swap");
      boxes[j].classList.add("swap");

      updateExecutionSteps(numbers, "Swap", "Sorting", numbers[i], numbers[j]);
      await sleep(2500);

      await swapVisual(numbers, boxes, i, j);

      boxes[i].classList.remove("swap");
      boxes[j].classList.remove("swap");
    }

    boxes[j].classList.remove("compare");
  }

  boxes[i + 1].classList.add("swap");
  boxes[high].classList.add("swap");

  updateExecutionSteps(
    numbers,
    "Swap",
    "Sorting",
    numbers[i + 1],
    numbers[high],
  );
  await sleep(2500);

  await swapVisual(numbers, boxes, i + 1, high);

  boxes[i + 1].classList.remove("swap");
  boxes[high].classList.remove("swap");

  await sleep(2500);

  return i + 1;
}

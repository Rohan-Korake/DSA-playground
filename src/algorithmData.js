export const algorithms = {
  bubbleSort: {
    title: "Bubble Sort",
    description:
      "A simple sorting algorithm that repeatedly compares and swaps adjacent elements until the list is sorted.",
    category: "Sorting Algorithm",
    difficulty: "Easy",
    approach: "Comparison-based",
    space: "O(1)",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },

  selectionSort: {
    title: "Selection Sort",
    description:
      "Selects the smallest element from the unsorted part and places it at the beginning of the list.",
    category: "Sorting Algorithm",
    difficulty: "Easy",
    approach: "Comparison-based",
    space: "O(1)",
    time: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },

  insertionSort: {
    title: "Insertion Sort",
    description:
      "Builds the sorted array one element at a time by inserting each element into its correct position.",
    category: "Sorting Algorithm",
    difficulty: "Easy",
    approach: "Comparison-based",
    space: "O(1)",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },

  mergeSort: {
    title: "Merge Sort",
    description:
      "A divide-and-conquer sorting algorithm that divides the array into halves, sorts them, and merges them back.",
    category: "Sorting Algorithm",
    difficulty: "Medium",
    approach: "Divide and Conquer",
    space: "O(n)",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
  },

  quickSort: {
    title: "Quick Sort",
    description:
      "A divide-and-conquer algorithm that partitions the array and recursively sorts the partitions.",
    category: "Sorting Algorithm",
    difficulty: "Medium",
    approach: "Divide and Conquer",
    space: "O(log n)",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },

  linearSearch: {
    title: "Linear Search",
    description:
      "Searches for an element by checking each element of the list one by one until found or end is reached.",
    category: "Searching Algorithm",
    difficulty: "Easy",
    approach: "Sequential",
    space: "O(1)",
    time: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
  },

  binarySearch: {
    title: "Binary Search",
    description:
      "Searches a sorted array by repeatedly dividing the search interval in half until the element is found.",
    category: "Searching Algorithm",
    difficulty: "Medium",
    approach: "Divide and Conquer",
    space: "O(1)",
    time: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
  },

  stackSimulation: {
    title: "Stack",
    description:
      "A linear data structure that follows Last-In-First-Out (LIFO) principle for adding and removing elements.",
    category: "Data Structure",
    difficulty: "Easy",
    approach: "Abstract Data Type",
    space: "O(n)",
    time: {
      push: "O(1)",
      pop: "O(1)",
      peek: "O(1)",
    },
  },

  queueSimulation: {
    title: "Queue",
    description:
      "A linear data structure that follows First-In-First-Out (FIFO) principle for inserting and deleting elements.",
    category: "Data Structure",
    difficulty: "Easy",
    approach: "Abstract Data Type",
    space: "O(n)",
    time: {
      enqueue: "O(1)",
      dequeue: "O(1)",
      front: "O(1)",
    },
  },
};

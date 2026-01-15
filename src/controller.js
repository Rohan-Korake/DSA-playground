export function controller() {
  const start = document.getElementById("start");
  const random = document.getElementById("random");
  const algorithmVisualizer = document.getElementById("algorithmVisualizer");
  let cardId = 0;

  // handle start button functionality
  start.addEventListener("click", function () {
    cardId = 0;
    algorithmVisualizer.innerHTML = "";
    const inputBox = document.getElementById("inputBox").value;
    // convert string → array of numbers
    const numbers = inputBox.split(" ").map(Number);
    if (inputBox == "") {
      alert("Enter input numbers!");
      return;
    } else {
      numbers.forEach((num) => {
        if (num > 0) {
          createBlock(num);
        } else {
          alert("Enter positive numbers!");
          return;
        }
      });
    }
  });

  // handle random value button
  random.addEventListener("click", function () {
    cardId = 0;
    algorithmVisualizer.innerHTML = "";
    const arr = [];
    const inputBox = document.getElementById("inputBox");
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
      inputBox.value = arr.join(" ");
    }
    arr.forEach((num) => {
      createBlock(num);
    });
  });
}

function createBlock(ele) {
  const box = document.createElement("div");
  box.className = "box";
  box.innerHTML = `
    <div class="text" id="${(cardId += 1)}">${ele}</div>
    `;
  algorithmVisualizer.appendChild(box);
}

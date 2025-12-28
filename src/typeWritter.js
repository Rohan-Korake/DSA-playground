export function initTypeWritter() {
  const textline = "Learn DSA Visually...";

  const typeWritterContainer = document.getElementById("typeWritterContainer");
  let displayLine = "";
  let indx = 0;
  run();

  //Type the letter
  function run() {
    setTimeout(() => {
      text();

      if (indx == textline.length) {
        return;
      }

      run();
    }, 100);
  }

  //Add next letter
  function text() {
    displayLine += textline[indx];
    indx++;
    typeWritterContainer.textContent = displayLine;
  }
}

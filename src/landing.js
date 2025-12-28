export function initLanding() {
  const content = document.querySelector(".home-page");
  content.classList.add("show-wave");
  document.getElementById("homePage").style.display = "block";
  document.getElementById("visualizerContainer").style.display = "none";

  // const homeNav = document.getElementById("homeNav");
  // homeNav.addEventListener("click", function () {
  //   const main = document.getElementById("main");
  //   const bubbleSortPage = document.querySelector(".bubble-sort-page");
  //   bubbleSortPage.classList.remove("show-wave");
  //   bubbleSortPage.classList.add("hide-wave");

  //   main.classList.add("hide-wave");
  //   main.classList.remove("hide-wave");
  //   content.classList.add("show-wave");
  //   document.getElementById("homePage").style.display = "block";
  // });
}

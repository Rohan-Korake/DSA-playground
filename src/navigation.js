export function initNavbar() {
  const hamBurger = document.getElementById("hamBurger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("overlay");
  const homeNav = document.getElementById("homeNav");
  const homePage = document.querySelector(".home-page");
  const visualizerContainer = document.querySelector(".visualizer-container");
  const cardContainer = document.getElementById("cardContainer");

  //initialize by default
  homePage.classList.add("show-wave");
  homePage.style.display = "block";
  visualizerContainer.style.display = "none";

  //handle hamburger icon
  hamBurger.addEventListener("click", function () {
    toggleHamburgerMenu();
  });

  //handle hamburger back blur frame
  overlay.addEventListener("click", function () {
    toggleHamburgerMenu();
  });

  //handle navbar home link button
  homeNav.addEventListener("click", function () {
    if (navMenu.style.display == "block") {
      toggleHamburgerMenu();
    }

    //check the current is home or not
    if (homePage.style.display == "block") return;

    visualizerContainer.classList.remove("show-wave");
    visualizerContainer.classList.add("hide-wave");

    // wait for hide animation to finish before actually hiding the element
    visualizerContainer.addEventListener(
      "animationend",
      function _hideViz() {
        visualizerContainer.style.display = "none";
        visualizerContainer.classList.remove("hide-wave");
        visualizerContainer.removeEventListener("animationend", _hideViz);
        homePage.style.display = "block";
        homePage.classList.add("show-wave");
      },
      { once: true }
    );
  });

  //handle card button
  cardContainer.addEventListener("click", (e) => {
    if (navMenu.style.display == "block") {
      toggleHamburgerMenu();
    }

    // get exact element from multiple id's
    const cardButton = e.target.closest(".try-button");
    if (!cardButton) return;

    homePage.classList.remove("show-wave");
    homePage.classList.add("hide-wave");

    // wait for hide animation to finish before actually hiding the element
    homePage.addEventListener(
      "animationend",
      function _hideHome() {
        homePage.style.display = "none";
        homePage.classList.remove("hide-wave");
        homePage.removeEventListener("animationend", _hideHome);
        visualizerContainer.style.display = "block";
        visualizerContainer.classList.add("show-wave");
      },
      { once: true }
    );
  });

  //handle the hamburger functionality
  function toggleHamburgerMenu() {
    navMenu.style.display = navMenu.style.display == "block" ? "none" : "block";
    overlay.classList.toggle("active");
  }
}

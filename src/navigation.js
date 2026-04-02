import { navigateToHome, navigateToAbout } from "./router.js";

export function initNavbar() {
  const hamBurger = document.getElementById("hamBurger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("overlay");
  const homeNav = document.getElementById("homeNav");
  const aboutNav = document.getElementById("aboutNav");
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
    navigateToHome();
  });

  //handle navbar about link button
  aboutNav.addEventListener("click", function () {
    if (navMenu.style.display == "block") {
      toggleHamburgerMenu();
    }
    navigateToAbout();
  });

  //handle card button
  cardContainer.addEventListener("click", (e) => {
    if (navMenu.style.display == "block") {
      toggleHamburgerMenu();
    }
  });

  //handle the hamburger functionality
  function toggleHamburgerMenu() {
    navMenu.style.display = navMenu.style.display == "block" ? "none" : "block";
    overlay.classList.toggle("active");
  }
}

import { loadData } from "./renderAlgorithm.js";
import { resetAlgorithmState } from "./controller.js";

export function initRouter() {
  // Listen for hash changes (browser back/forward and manual navigation)
  window.addEventListener("hashchange", handleRouteChange);
  // Handle initial page load
  handleRouteChange();
}

function handleRouteChange() {
  const hash = location.hash.slice(1) || "home";
  const homePage = document.querySelector(".home-page");
  const visualizerContainer = document.querySelector(".visualizer-container");
  const aboutPage = document.querySelector(".about-page");
  const navMenu = document.getElementById("navMenu");

  // Close hamburger menu if open
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
    document.getElementById("overlay").classList.remove("active");
  }

  // Route based on hash
  if (hash === "home" || hash === "") {
    showHome(homePage, visualizerContainer, aboutPage);
  } else if (hash === "about") {
    showAbout(homePage, visualizerContainer, aboutPage);
  } else {
    showVisualizer(hash, homePage, visualizerContainer, aboutPage);
  }
}

function showHome(homePage, visualizerContainer, aboutPage) {
  if (homePage.style.display === "block") return;

  // Hide about page immediately
  aboutPage.style.display = "none";

  // If visualizer is showing, hide it
  if (visualizerContainer.style.display === "block") {
    visualizerContainer.classList.remove("show-wave");
    visualizerContainer.classList.add("hide-wave");

    visualizerContainer.addEventListener(
      "animationend",
      function _hideViz() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        visualizerContainer.style.display = "none";
        visualizerContainer.classList.remove("hide-wave");
        visualizerContainer.removeEventListener("animationend", _hideViz);
        homePage.style.display = "block";
        homePage.classList.add("show-wave");
        resetAlgorithmState();
      },
      { once: true },
    );
  } else {
    // Visualizer not showing, just show home page
    window.scrollTo({ top: 0, behavior: "smooth" });
    homePage.style.display = "block";
    homePage.classList.add("show-wave");
    resetAlgorithmState();
  }
}

function showAbout(homePage, visualizerContainer, aboutPage) {
  if (aboutPage.style.display === "block") return;

  // Hide other pages
  hideOtherPages(visualizerContainer, null);
  homePage.style.display = "none";

  aboutPage.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showVisualizer(algoName, homePage, visualizerContainer, aboutPage) {
  const searchAlgos = ["linearSearch", "binarySearch"];
  const inputTarget = document.getElementById("inputTarget");

  // Show input target for search algorithms
  inputTarget.style.display = searchAlgos.includes(algoName) ? "flex" : "none";

  // Hide about page
  if (aboutPage.style.display === "block") {
    aboutPage.style.display = "none";
  }

  if (visualizerContainer.style.display === "block") {
    // Already on visualizer page, just load new algo data
    loadData(algoName);
    return;
  }

  // Hide home with animation
  homePage.classList.remove("show-wave");
  homePage.classList.add("hide-wave");

  homePage.addEventListener(
    "animationend",
    function _hideHome() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      homePage.style.display = "none";
      homePage.classList.remove("hide-wave");
      homePage.removeEventListener("animationend", _hideHome);
      visualizerContainer.style.display = "block";
      visualizerContainer.classList.add("show-wave");
      resetAlgorithmState();
      loadData(algoName);
    },
    { once: true },
  );
}

function hideOtherPages(visualizerContainer, aboutPage) {
  if (visualizerContainer && visualizerContainer.style.display === "block") {
    visualizerContainer.classList.remove("show-wave");
    visualizerContainer.classList.add("hide-wave");
    visualizerContainer.addEventListener(
      "animationend",
      function _hide() {
        visualizerContainer.style.display = "none";
        visualizerContainer.classList.remove("hide-wave");
        visualizerContainer.removeEventListener("animationend", _hide);
      },
      { once: true },
    );
  }
  if (aboutPage && aboutPage.style.display === "block") {
    aboutPage.style.display = "none";
  }
}

// Navigation helper functions
export function navigateToAlgorithm(algoName) {
  window.location.hash = algoName;
}

export function navigateToHome() {
  window.location.hash = "home";
}

export function navigateToAbout() {
  window.location.hash = "about";
}

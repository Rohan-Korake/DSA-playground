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

  const hideCurrentPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    homePage.style.display = "block";
    homePage.classList.add("show-wave");
    resetAlgorithmState();
  };

  if (visualizerContainer.style.display === "block") {
    visualizerContainer.classList.remove("show-wave");
    visualizerContainer.classList.add("hide-wave");

    visualizerContainer.addEventListener(
      "animationend",
      function _hideViz() {
        visualizerContainer.style.display = "none";
        visualizerContainer.classList.remove("hide-wave");
        visualizerContainer.removeEventListener("animationend", _hideViz);
        hideCurrentPage();
      },
      { once: true },
    );
  } else if (aboutPage.style.display === "block") {
    aboutPage.classList.remove("show-wave");
    aboutPage.classList.add("hide-wave");

    aboutPage.addEventListener(
      "animationend",
      function _hideAbout() {
        aboutPage.style.display = "none";
        aboutPage.classList.remove("hide-wave");
        aboutPage.removeEventListener("animationend", _hideAbout);
        hideCurrentPage();
      },
      { once: true },
    );
  } else {
    hideCurrentPage();
  }
}

function showAbout(homePage, visualizerContainer, aboutPage) {
  if (aboutPage.style.display === "block") return;

  // Hide home page with animation
  if (homePage.style.display === "block") {
    homePage.classList.remove("show-wave");
    homePage.classList.add("hide-wave");

    homePage.addEventListener(
      "animationend",
      function _hideHome() {
        homePage.style.display = "none";
        homePage.classList.remove("hide-wave");
        homePage.removeEventListener("animationend", _hideHome);

        // Show about page after home animation ends
        aboutPage.style.display = "block";
        aboutPage.classList.add("show-wave");
        aboutPage.addEventListener(
          "animationend",
          () => {
            aboutPage.classList.remove("show-wave");
          },
          { once: true },
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      { once: true },
    );
  } else {
    // Home is already hidden, just show about
    aboutPage.style.display = "block";
    aboutPage.classList.add("show-wave");
    aboutPage.addEventListener(
      "animationend",
      () => {
        aboutPage.classList.remove("show-wave");
      },
      { once: true },
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  hideOtherPages(visualizerContainer, null);
}

function showVisualizer(algoName, homePage, visualizerContainer, aboutPage) {
  const searchAlgos = ["linearSearch", "binarySearch"];
  const inputTarget = document.getElementById("inputTarget");

  // Show input target for search algorithms
  inputTarget.style.display = searchAlgos.includes(algoName) ? "flex" : "none";

  aboutPage.style.display = "none";

  if (visualizerContainer.style.display === "block") {
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

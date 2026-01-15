import { initTypeWritter } from "./typeWritter.js";
import { initCards } from "./renderCard.js";
import { initTheme } from "./theme.js";
import { initNavbar } from "./navigation.js";
import { renderAlgo } from "./renderAlgorithm.js";
import { controller } from "./controller.js";

// Setup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTypeWritter();
  initCards();
  initTheme();
  initNavbar();
  renderAlgo();
  controller();
});

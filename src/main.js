import { initLanding } from "./landing.js";
import { initTypeWritter } from "./typeWritter.js";
import { initCards } from "./renderCard.js";
import { initTheme } from "./theme.js";
import { initNavbar } from "./navBar.js";
import { initAlgoData } from "./algorithmData.js";

// Setup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initLanding();
  initTypeWritter();
  initCards();
  initTheme();
  initNavbar();
  initAlgoData();
});

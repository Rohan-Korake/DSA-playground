import { initTypeWritter } from "./typeWritter.js";
import { initCards } from "./renderCard.js";
import { initTheme } from "./theme.js";
import { initNavbar } from "./navigation.js";
import { initAlgoData } from "./algorithmData.js";

// Setup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTypeWritter();
  initCards();
  initTheme();
  initNavbar();
  initAlgoData();
});

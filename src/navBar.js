export function initNavbar() {
  const hamBurger = document.getElementById("hamBurger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("overlay");
  hamBurger.addEventListener("click", function () {
    navMenu.style.display = navMenu.style.display == "block" ? "none" : "block";
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", function () {
    navMenu.style.display = navMenu.style.display == "block" ? "none" : "block";
    overlay.classList.toggle("active");
  });
}

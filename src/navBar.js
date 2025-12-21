export function initNavbar() {
  const lightMode = document.getElementById("lightMode");
  const darkMode = document.getElementById("darkMode");

  // light mode
  lightMode.addEventListener("click", function () {
    lightMode.style.animation = "hidden-animation 1 0.5s ease";
    lightMode.style.display = "none";

    document.documentElement.classList.add("light");

    darkMode.style.animation = "show-animation 1 0.5s ease";
    darkMode.style.display = "block";
  });

  // dark mode
  darkMode.addEventListener("click", function () {
    lightMode.style.animation = "show-animation 1 0.5s ease";
    lightMode.style.display = "block";

    document.documentElement.classList.remove("light");

    darkMode.style.display = "none";
    darkMode.style.animation = "hidden-animation 1 0.5s ease";
  });
}

export function initTheme() {
  //set Local storage saved theme
  const savedTheme = localStorage.getItem("theme");
  document.documentElement.classList.add(savedTheme);

  if (savedTheme === "light") {
    lightTheme();
  } else {
    darkTheme();
  }

  const lightMode = document.getElementById("lightMode");
  const darkMode = document.getElementById("darkMode");

  // light mode
  lightMode.addEventListener("click", function () {
    lightTheme();
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  });

  // dark mode
  darkMode.addEventListener("click", function () {
    darkTheme();
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  });
}

//Display dark mode button
function lightTheme() {
  lightMode.style.animation = "hidden-animation 1 0.5s ease";
  lightMode.style.display = "none";
  darkMode.style.animation = "show-animation 1 0.5s ease";
  darkMode.style.display = "block";
}

//Display light mode button
function darkTheme() {
  darkMode.style.animation = "hidden-animation 1 0.5s ease";
  darkMode.style.display = "none";
  lightMode.style.animation = "show-animation 1 0.5s ease";
  lightMode.style.display = "block";
}

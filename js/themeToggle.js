const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const html = document.documentElement;
const currentTheme = localStorage.getItem("theme") || "dark";

html.setAttribute("data-theme", currentTheme);
updateIcon(currentTheme);

/*Toggle theme*/
themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

/*Update icon*/
function updateIcon(theme) {
  if (theme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

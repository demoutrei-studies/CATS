const themeToggleButton = document.querySelector("#theme-toggle-button");


function toggleTheme() {
  const body = document.querySelector("body[theme]");
  if (body.getAttribute("theme") == "dark") {
    body.setAttribute("theme", "light");
  } else {
    body.setAttribute("theme", "dark");
  }
}
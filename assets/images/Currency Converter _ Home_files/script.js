const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

// ✅ Load saved theme
let savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

// Set correct icon on load
if (savedTheme === "dark") {
  icon.classList.replace("fa-moon", "fa-sun");
}

// ✅ Toggle theme
toggleBtn.addEventListener("click", () => {
  let currentTheme = document.body.getAttribute("data-theme");

  let newTheme = currentTheme === "dark" ? "light" : "dark";

  // change theme
  document.body.setAttribute("data-theme", newTheme);

  // save in localStorage
  localStorage.setItem("theme", newTheme);

  // change icon
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
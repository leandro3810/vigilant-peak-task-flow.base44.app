// Script para alternar o tema claro/escuro
const toggleThemeButton = document.getElementById("theme-toggle");

toggleThemeButton.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
});

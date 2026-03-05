// footer-loader.js — Carga el módulo footer.html de forma dinámica
// Incluir este script en todas las páginas que necesiten el footer.

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("footer-container");
  if (!container) return;

  fetch("modules/footer.html")
    .then(function (response) {
      if (!response.ok) throw new Error("No se pudo cargar footer.html");
      return response.text();
    })
    .then(function (html) {
      container.innerHTML = html;
    })
    .catch(function (error) {
      console.error("Error al cargar el footer:", error);
    });
});

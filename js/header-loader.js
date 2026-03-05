// header-loader.js — Carga el módulo header.html de forma dinámica.
// Responsabilidad exclusiva: inyectar el HTML del header en la página.
// La lógica del enlace activo y submódulos es manejada por header.js.
// Orden de carga requerido: header-loader.js → header.js → menu-mobile.js

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("header-container");
  if (!container) return;

  fetch("modules/header.html")
    .then(function (response) {
      if (!response.ok) throw new Error("No se pudo cargar header.html");
      return response.text();
    })
    .then(function (html) {
      container.innerHTML = html;
    })
    .catch(function (error) {
      console.error("Error al cargar el header:", error);
    });
});

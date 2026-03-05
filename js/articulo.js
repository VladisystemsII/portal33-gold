// articulo.js — Lógica de carga del detalle de artículo de Portal33
// Dependencia: config.js debe cargarse antes que este script.
// Dependencia: DOM debe tener #loadingArticulo y #articleContainer.

document.addEventListener("DOMContentLoaded", function () {

  const loading     = document.getElementById("loadingArticulo");
  const containerEl = document.getElementById("articleContainer");
  const titleEl     = document.getElementById("articleTitle");
  const dateEl      = document.getElementById("articleDate");
  const contentEl   = document.getElementById("articleContent");

  // Obtener código desde parámetro URL
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");

  // Sin código en URL → mostrar error inmediato
  if (!codigo) {
    loading.style.display = "none";
    titleEl.textContent = "Artículo no encontrado";
    containerEl.style.display = "block";
    return;
  }

  loading.style.display = "block";

  fetch(PORTAL33_CONFIG.BLOG_ENDPOINT)
    .then(function (response) {
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response.json();
    })
    .then(function (data) {

      const post = data.find(function (p) {
        return (
          p["CÓDIGO"]?.trim() === codigo.trim() &&
          String(p["Activo (si/no)"]).toLowerCase() === "si"
        );
      });

      if (!post) {
        titleEl.textContent = "Artículo no encontrado o inactivo";
        containerEl.style.display = "block";
        return;
      }

      // Renderizar artículo
      titleEl.textContent = post["Titulo"];
      dateEl.textContent = new Date(post["Fecha"]).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // Contenido: permite HTML básico del Google Sheet pero convierte saltos de línea
      contentEl.innerHTML = post["Contenido"]
        ? post["Contenido"].replace(/\n/g, "<br>")
        : "<p>Este artículo no tiene contenido disponible.</p>";

      containerEl.style.display = "block";

    })
    .catch(function (err) {
      console.error("❌ Error cargando artículo:", err);
      titleEl.textContent = "Error al cargar el artículo. Intenta más tarde.";
      containerEl.style.display = "block";
    })
    .finally(function () {
      loading.style.display = "none";
    });

});

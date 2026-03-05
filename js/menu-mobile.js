/* =======================================
   MENÚ HAMBURGUESA MÓVIL - Portal 33
   ======================================= */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🍔 Menú hamburguesa inicializado');
  
  // Crear botón hamburguesa si no existe
  crearBotonHamburguesa();
  
  // Configurar event listeners
  configurarMenuMobile();
  
  // Cerrar menú al hacer clic en un link
  cerrarMenuAlNavegar();
  
  // Cerrar menú al redimensionar ventana (si pasa a desktop)
  cerrarMenuAlRedimensionar();
});

// ===== CREAR BOTÓN HAMBURGUESA =====
function crearBotonHamburguesa() {
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  
  if (!nav || !menu) {
    console.error('❌ No se encontró .nav o .menu');
    return;
  }
  
  // Verificar si ya existe el botón
  if (document.querySelector('.menu-toggle')) {
    return;
  }
  
  // Crear botón hamburguesa
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  
  // Insertar botón antes del menú
  nav.insertBefore(menuToggle, menu);
  
  console.log('✅ Botón hamburguesa creado');
}

// ===== CONFIGURAR EVENT LISTENERS =====
function configurarMenuMobile() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (!menuToggle || !menu) {
    console.error('❌ No se encontró el botón o menú');
    return;
  }
  
  // Toggle menu al hacer clic en hamburguesa
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('mobile-open')) {
      cerrarMenu();
    }
  });
  
  console.log('✅ Event listeners configurados');
}

// ===== TOGGLE MENU =====
function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (!menuToggle || !menu) return;
  
  const isOpen = menu.classList.contains('mobile-open');
  
  if (isOpen) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
}

// ===== ABRIR MENU =====
function abrirMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const body = document.body;
  
  if (!menuToggle || !menu) return;
  
  menu.classList.add('mobile-open');
  menuToggle.classList.add('active');
  menuToggle.setAttribute('aria-expanded', 'true');
  
  // Prevenir scroll del body cuando el menú está abierto
  body.style.overflow = 'hidden';
  
  console.log('📂 Menú abierto');
}

// ===== CERRAR MENU =====
function cerrarMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const body = document.body;
  
  if (!menuToggle || !menu) return;
  
  menu.classList.remove('mobile-open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  
  // Restaurar scroll del body
  body.style.overflow = '';
  
  console.log('📁 Menú cerrado');
}

// ===== CERRAR AL NAVEGAR =====
function cerrarMenuAlNavegar() {
  const menu = document.querySelector('.menu');
  
  if (!menu) return;
  
  const menuLinks = menu.querySelectorAll('a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      cerrarMenu();
      console.log('🔗 Navegando, menú cerrado');
    });
  });
}

// ===== CERRAR AL REDIMENSIONAR =====
function cerrarMenuAlRedimensionar() {
  let resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(function() {
      // Si la ventana es mayor a 768px, cerrar menú mobile
      if (window.innerWidth > 768) {
        cerrarMenu();
        console.log('🖥️ Desktop mode - menú cerrado');
      }
    }, 250);
  });
}

// ===== FUNCIONES DE UTILIDAD =====

// Verificar si está en modo mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Exportar funciones si se necesita usar desde otro script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    abrirMenu,
    cerrarMenu,
    toggleMenu,
    isMobile
  };
}
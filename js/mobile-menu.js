function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeBtn = document.getElementById('nav-menu-close');

  if (!toggleBtn || !navMenu) return;

  // Toggle Menú
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('is-active');
    toggleBtn.classList.toggle('active', isOpen);
    
    // Cambiar texto del botón
    const btnText = toggleBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = isOpen ? '[ CERRAR // ✕ ]' : '[ MENU // ☰ ]';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }

  // Cerrar menú automáticamente al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });

  // Cerrar con tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
      toggleMenu();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}
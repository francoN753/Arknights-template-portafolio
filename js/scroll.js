// Inicialización de Lenis Smooth Scroll + Sincronización GSAP
const lenis = new Lenis({
  duration: 2.2,          // Mayor duración = scroll más pesado, lento y cinematográfico
  wheelMultiplier: 0.75,  // Menor distancia por rueda = más precisión para apreciar las animaciones
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Sincronización exacta con GSAP ScrollTrigger
if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
} else {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Lógica del botón REBOOT_SYSTEM (Ir Arriba)
document.addEventListener('DOMContentLoaded', () => {
  const btnReboot = document.getElementById('btn-reboot');
  if (btnReboot) {
    btnReboot.addEventListener('click', () => {
      // Usar lenis para un scroll suave, o fallback a window.scrollTo si falla
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
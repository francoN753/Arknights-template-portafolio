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
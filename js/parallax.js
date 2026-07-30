function initTacticalParallax() {
  // Captura de las capas en base al HTML
  const bgLayer = document.querySelector('.tactical-bg');        // Fondo (Grid / Vectores HUD)
  const midLayer = document.querySelector('.marquee-bg');        // Midground (Texto "CREATIVE CODER")
  const foreLayer = document.getElementById('glitch-title');    // Foreground (Título "NUZZO")
  const taglineLayer = document.querySelector('.hero-tagline');  // Detalle frontal adicional

  if (!bgLayer || !foreLayer) return;

  // Variables para las coordenadas centradas (-1 a 1)
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // Escuchar el movimiento del mouse
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX - windowHalfX) / windowHalfX;
    targetY = (e.clientY - windowHalfY) / windowHalfY;
  });

  // Re-calcular centro en caso de cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
  });

  // Factores de desplazamiento (Intensidad en PX)
  const DEPTH = {
    bg: -12,
    mid: 22,
    fore: 45,
    tagline: 30
  };

  function render() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    if (bgLayer) {
      bgLayer.style.transform = `translate3d(${currentX * DEPTH.bg}px, ${currentY * DEPTH.bg}px, 0)`;
    }
    if (midLayer) {
      midLayer.style.transform = `translate3d(${currentX * DEPTH.mid}px, ${currentY * DEPTH.mid}px, 0)`;
    }
    if (foreLayer) {
      foreLayer.style.transform = `translate3d(${currentX * DEPTH.fore}px, ${currentY * DEPTH.fore}px, 0)`;
    }
    if (taglineLayer) {
      taglineLayer.style.transform = `translate3d(${currentX * DEPTH.tagline}px, ${currentY * DEPTH.tagline}px, 0)`;
    }

    requestAnimationFrame(render);
  }

  render();
}

// Iniciar script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTacticalParallax);
} else {
  initTacticalParallax();
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP o ScrollTrigger no están cargados.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ═══════════════════════════════════════════════════════════
    // TRANSICIÓN CINEMÁTICA: HERO → SOBRE MÍ ("TACTICAL BREACH")
    // ═══════════════════════════════════════════════════════════

    const tacticalCard = document.querySelector(".tactical-card");
    const cardCrosshairs = document.querySelectorAll(".corner-crosshair");
    const cardHeader = document.querySelector(".card-header");
    const cardSubLabel = document.querySelector(".sub-label");
    const cardMainTitle = document.querySelector(".card-main-title");
    const cardBio = document.querySelector(".card-bio");
    const specItems = document.querySelectorAll(".spec-item");
    const cardFooter = document.querySelector(".card-footer");

    // Estado inicial de la tarjeta "Sobre Mí"
    if (tacticalCard) {
        gsap.set(tacticalCard, {
            opacity: 0,
            y: 35,
            scale: 0.98
        });
    }
    if (cardCrosshairs.length) gsap.set(cardCrosshairs, { opacity: 0, scale: 0.8 });
    if (cardHeader) gsap.set(cardHeader, { opacity: 0, y: -10 });
    if (cardSubLabel) gsap.set(cardSubLabel, { opacity: 0, x: -10 });
    if (cardMainTitle) gsap.set(cardMainTitle, { opacity: 0, y: 12 });
    if (cardBio) gsap.set(cardBio, { opacity: 0, y: 12 });
    if (specItems.length) gsap.set(specItems, { opacity: 0, y: 15 });
    if (cardFooter) gsap.set(cardFooter, { opacity: 0, y: 8 });

    // Timeline Principal Hero -> Sobre Mí
    const breachTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5
        }
    });

    // ═══════════════════════════════════════════════════════════
    // FASE 1: DESVANECIMIENTO INMEDIATO DE ELEMENTOS HERO Y HUD FLOTANTE
    // (Ocurre ANTES de que la tarjeta de Sobre Mí aparezca)
    // ═══════════════════════════════════════════════════════════

    const elementsToFadeBeforeAbout = document.querySelectorAll(`
        #tactical-flashlight,
        .marquee-bg,
        .hero-title-wrapper,
        .hero-tagline,
        .hero-footer-info,
        .hero-footer,
        #cyber-core,
        .left-sidebar,
        .datamatrix-corner-block,
        .hud-callout,
        .hud-callouts,
        .hud-corners,
        .hud-decor,
        .availability-badge-bottom
    `);

    // Tan pronto como se inicia el scroll (t = 0 a t = 0.25), todo el HUD flotante se oculta
    breachTl.to(elementsToFadeBeforeAbout, {
        opacity: 0,
        y: -15,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power1.out"
    }, 0);

    // ═══════════════════════════════════════════════════════════
    // FASE 2: ENTRADA LIMPIA DE LA TARJETA "SOBRE MÍ"
    // (Se activa a partir de t = 0.35, cuando la pantalla ya está despejada)
    // ═══════════════════════════════════════════════════════════

    if (tacticalCard) {
        breachTl.to(tacticalCard, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        }, 0.35);
    }

    if (cardCrosshairs.length) {
        breachTl.to(cardCrosshairs, {
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            duration: 0.15,
            ease: "power1.out"
        }, 0.45);
    }

    if (cardHeader) breachTl.to(cardHeader, { opacity: 1, y: 0, duration: 0.15 }, 0.5);
    if (cardSubLabel) breachTl.to(cardSubLabel, { opacity: 1, x: 0, duration: 0.15 }, 0.55);
    if (cardMainTitle) breachTl.to(cardMainTitle, { opacity: 1, y: 0, duration: 0.2 }, 0.58);
    if (cardBio) breachTl.to(cardBio, { opacity: 1, y: 0, duration: 0.2 }, 0.62);
    if (specItems.length) {
        breachTl.to(specItems, {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.2,
            ease: "power1.out"
        }, 0.68);
    }
    if (cardFooter) breachTl.to(cardFooter, { opacity: 1, y: 0, duration: 0.15 }, 0.8);
});
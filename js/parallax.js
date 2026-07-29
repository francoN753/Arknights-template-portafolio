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

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  // Escuchar el movimiento del mouse
  window.addEventListener('mousemove', (e) => {
    // Normalizar del -1 al 1 tomando el centro como punto 0,0
    targetX = (e.clientX - windowHalfX) / windowHalfX;
    targetY = (e.clientY - windowHalfY) / windowHalfY;
  });

  // Re-calcular centro en caso de cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
  });

  // Factores de desplazamiento (Intensidad en PX)
  // Valores negativos en el fondo para crear sentido de perspectiva invertida/profundidad
  const DEPTH = {
    bg: -12,      // Fondo: Desplazamiento mínimo e inverso
    mid: 22,      // Marquee: Desplazamiento medio
    fore: 45,     // NUZZO: Desplazamiento principal
    tagline: 30   // Subtítulo: Desplazamiento intermedio-alto
  };

  function render() {
    // LERP: 0.06 controla la "inercia" del movimiento (más bajo = más suave)
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    // 1. Capa Fondo (REF_GRID / HUD Vectors)
    if (bgLayer) {
      bgLayer.style.transform = `translate3d(${currentX * DEPTH.bg}px, ${currentY * DEPTH.bg}px, 0)`;
    }

    // 2. Capa Intermedia (Marquee Text)
    if (midLayer) {
      midLayer.style.transform = `translate3d(${currentX * DEPTH.mid}px, ${currentY * DEPTH.mid}px, 0)`;
    }

    // 3. Capa Frontal (NUZZO)
    if (foreLayer) {
      foreLayer.style.transform = `translate3d(${currentX * DEPTH.fore}px, ${currentY * DEPTH.fore}px, 0)`;
    }

    // 4. Tagline Superior
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

    const heroChars = document.querySelectorAll("#glitch-title .char");
    const tacticalCard = document.querySelector(".tactical-card");
    const cardCrosshairs = document.querySelectorAll(".corner-crosshair");
    const cardHeader = document.querySelector(".card-header");
    const cardSubLabel = document.querySelector(".sub-label");
    const cardMainTitle = document.querySelector(".card-main-title");
    const cardBio = document.querySelector(".card-bio");
    const specItems = document.querySelectorAll(".spec-item");
    const cardFooter = document.querySelector(".card-footer");
    const scanLine = document.querySelector(".scan-line");
    const breachFlash = document.querySelector(".breach-flash");

    // Estado inicial: tarjeta y contenidos con valores sutiles de entrada
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

    // ── TIMELINE PRINCIPAL (Transición sutil y orgánica) ──
    const breachTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",     // Vinculado exactamente al desplazamiento natural del Hero
            scrub: 0.5             // Scrub muy suave y continuo
        }
    });

    // ════════════════════════════════════════
    // FASE 1: DESVANECIMIENTO SUAVE DEL HERO (0 → 0.5)
    // ════════════════════════════════════════

    // 1a. Título NUZZO se eleva suavemente y se desvanece
    breachTl.to(".hero-title-wrapper", {
        y: -40,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.3,
        ease: "power1.out"
    }, 0);

    // 1b. Subtítulo y pie de info se desvanecen
    breachTl.to(".hero-tagline, .hero-footer-info", {
        y: -25,
        opacity: 0,
        duration: 0.25,
        ease: "power1.out"
    }, 0);

    // 1c. Esfera 3D (cyber-core) se desvanece con leve expansión
    breachTl.to("#cyber-core", {
        scale: 1.8,
        opacity: 0,
        duration: 0.3,
        ease: "power1.out"
    }, 0);

    // 1d. Callouts del HUD del hero
    breachTl.to(".hud-callout", {
        opacity: 0,
        y: -15,
        stagger: 0.02,
        duration: 0.2,
        ease: "power1.out"
    }, 0);

    // ════════════════════════════════════════
    // FASE 2: ENTRADA SUAVE DE "SOBRE MÍ" (0.4 → 1.0)
    // ════════════════════════════════════════

    // 2a. Tarjeta principal se desliza hacia arriba con transparencia suave
    if (tacticalCard) {
        breachTl.to(tacticalCard, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        }, 0.35);
    }

    // 2b. Esquinas crosshair
    if (cardCrosshairs.length) {
        breachTl.to(cardCrosshairs, {
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            duration: 0.15,
            ease: "power1.out"
        }, 0.45);
    }

    // 2c. Contenido interno de la tarjeta en cascada sutil
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
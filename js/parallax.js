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

    // Estado inicial: tarjeta y contenidos ocultos
    if (tacticalCard) {
        gsap.set(tacticalCard, {
            opacity: 0,
            scale: 0.85,
            rotateX: 12,
            y: 80,
            filter: "blur(15px)"
        });
    }
    if (cardCrosshairs.length) gsap.set(cardCrosshairs, { opacity: 0, scale: 0 });
    if (cardHeader) gsap.set(cardHeader, { opacity: 0, y: -15 });
    if (cardSubLabel) gsap.set(cardSubLabel, { opacity: 0, x: -20 });
    if (cardMainTitle) gsap.set(cardMainTitle, { opacity: 0, y: 20, filter: "blur(8px)" });
    if (cardBio) gsap.set(cardBio, { opacity: 0, y: 15 });
    if (specItems.length) gsap.set(specItems, { opacity: 0, y: 20, scale: 0.95 });
    if (cardFooter) gsap.set(cardFooter, { opacity: 0, y: 10 });

    // ── TIMELINE PRINCIPAL (Sincronizada al scroll natural) ──
    const breachTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",     // Vinculado exactamente a la salida de la sección Hero
            scrub: 0.5             // Desplazamiento ultra fluido sin saltos
        }
    });

    // ════════════════════════════════════════
    // FASE 1: DESINTEGRACIÓN DEL HERO (0 → 0.4)
    // ════════════════════════════════════════

    // 1a. Marquee text se comprime y desvanece
    breachTl.to(".marquee-bg", {
        scaleX: 0.3,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.15,
        ease: "power2.in"
    }, 0);

    // 1b. Tagline sale hacia arriba con blur
    breachTl.to(".hero-tagline", {
        y: -80,
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.15,
        ease: "power2.in"
    }, 0);

    // 1c. Footer info desaparece
    breachTl.to(".hero-footer-info", {
        opacity: 0,
        y: -30,
        duration: 0.1,
        ease: "power1.out"
    }, 0);

    // 1d. DESINTEGRACIÓN INDIVIDUAL DE LETRAS NUZZO
    // Cada letra sale en una dirección diferente con rotación 3D
    if (heroChars.length) {
        const charAnimations = [
            { x: -120, y: -80, rotateZ: -25, rotateY: -45 },  // N
            { x: -50,  y: -110, rotateZ: 15,  rotateX: -35 },  // U
            { x: 0,    y: -130, rotateZ: -8,  rotateY: 20 },   // Z
            { x: 50,   y: -100, rotateZ: -18, rotateX: 40 },   // Z
            { x: 120,  y: -70,  rotateZ: 30,  rotateY: 45 }    // O
        ];

        heroChars.forEach((char, i) => {
            const anim = charAnimations[i] || charAnimations[0];
            breachTl.to(char, {
                x: anim.x,
                y: anim.y,
                rotateZ: anim.rotateZ,
                rotateY: anim.rotateY || 0,
                rotateX: anim.rotateX || 0,
                scale: 0.4,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.2,
                ease: "power3.in"
            }, 0.02 + (i * 0.025));
        });
    }

    // 1e. Esfera 3D (cyber-core) — zoom dramático
    breachTl.to("#cyber-core", {
        scale: 4,
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.25,
        ease: "power2.in"
    }, 0.05);

    // 1f. Callouts del HUD del hero se atenúan suavemente
    breachTl.to(".hud-callout", {
        opacity: 0,
        y: -20,
        stagger: 0.02,
        duration: 0.12,
        ease: "power1.out"
    }, 0.05);

    // ════════════════════════════════════════
    // FASE 2: SCAN-LINE + BREACH FLASH (0.3 → 0.5)
    // ════════════════════════════════════════

    // 2a. Scan-line recorre la pantalla de arriba a abajo
    if (scanLine) {
        breachTl.to(scanLine, {
            opacity: 1,
            duration: 0.02
        }, 0.3);

        breachTl.to(scanLine, {
            y: "100vh",
            duration: 0.15,
            ease: "power1.inOut"
        }, 0.3);

        breachTl.to(scanLine, {
            opacity: 0,
            duration: 0.02
        }, 0.45);
    }

    // 2b. Breach flash — destello amarillo sutil
    if (breachFlash) {
        breachTl.to(breachFlash, {
            opacity: 1,
            duration: 0.05,
            ease: "power4.in"
        }, 0.38);

        breachTl.to(breachFlash, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out"
        }, 0.43);
    }

    // ════════════════════════════════════════
    // FASE 3: MATERIALIZACIÓN DE LA TARJETA (0.45 → 1.0)
    // ════════════════════════════════════════

    // 3a. Tarjeta principal se materializa
    if (tacticalCard) {
        breachTl.to(tacticalCard, {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power3.out"
        }, 0.48);
    }

    // 3b. Crosshairs de esquinas aparecen con pop
    if (cardCrosshairs.length) {
        breachTl.to(cardCrosshairs, {
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            duration: 0.08,
            ease: "back.out(2)"
        }, 0.55);
    }

    // 3c. Header de la tarjeta
    if (cardHeader) {
        breachTl.to(cardHeader, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out"
        }, 0.6);
    }

    // 3d. Sub-label desliza desde la izquierda
    if (cardSubLabel) {
        breachTl.to(cardSubLabel, {
            opacity: 1,
            x: 0,
            duration: 0.08,
            ease: "power2.out"
        }, 0.65);
    }

    // 3e. Título principal con desblur dramático
    if (cardMainTitle) {
        breachTl.to(cardMainTitle, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.12,
            ease: "power2.out"
        }, 0.67);
    }

    // 3f. Bio text
    if (cardBio) {
        breachTl.to(cardBio, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out"
        }, 0.72);
    }

    // 3g. Spec items en cascada
    if (specItems.length) {
        breachTl.to(specItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.025,
            duration: 0.1,
            ease: "power2.out"
        }, 0.77);
    }

    // 3h. Footer de la tarjeta
    if (cardFooter) {
        breachTl.to(cardFooter, {
            opacity: 1,
            y: 0,
            duration: 0.08,
            ease: "power2.out"
        }, 0.88);
    }

    // 3i. Scan-line final recorre la tarjeta como "confirmación"
    if (scanLine) {
        breachTl.fromTo(scanLine,
            { y: 0, opacity: 0 },
            { opacity: 0.5, duration: 0.01 },
            0.92
        );
        breachTl.to(scanLine, {
            y: "100vh",
            duration: 0.08,
            ease: "power1.inOut"
        }, 0.92);
        breachTl.to(scanLine, {
            opacity: 0,
            duration: 0.01
        }, 1.0);
    }
});
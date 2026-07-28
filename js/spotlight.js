// js/spotlight.js — Efecto Spotlight estilo Warhol

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  const imageFrame = document.getElementById('imageFrame');
  const gradientOverlay = document.getElementById('gradientOverlay');
  const spotlight = document.getElementById('spotlight');
  const heroBg = document.getElementById('heroBg');

  if (!heroSection || !imageFrame || !gradientOverlay || !spotlight || !heroBg) return;

  // ═══════════════════════════════════════
  // CONFIGURACIÓN DEL FOCO
  // ═══════════════════════════════════════
  const CONFIG = {
    // CAMBIO: Radio ajustado proporcionalmente al nuevo tamaño del cuadro
    spotRadius: 260,
    penumbraFade: 2.2,
    smoothing: 0.12,
    parallaxIntensity: 15,
    outerDarkness: 0.97,
    midDarkness: 0.85,
  };

  // ═══════════════════════════════════════
  // ESTADO INTERNO
  // ═══════════════════════════════════════
  let mouseActive = false;
  let animating = false;

  let targetX = 0.5;
  let targetY = 0.5;

  let currentX = 0.5;
  let currentY = 0.5;

  // ═══════════════════════════════════════
  // LISTENER DE MOUSE
  // ═══════════════════════════════════════
  heroSection.addEventListener('mousemove', (e) => {
    const rect = imageFrame.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isInsideX = mouseX >= rect.left && mouseX <= rect.right;
    const isInsideY = mouseY >= rect.top && mouseY <= rect.bottom;

    if (isInsideX && isInsideY) {
      targetX = (mouseX - rect.left) / rect.width;
      targetY = (mouseY - rect.top) / rect.height;

      if (!mouseActive) {
        mouseActive = true;
        currentX = targetX;
        currentY = targetY;
        gradientOverlay.classList.remove('is-hidden');
        spotlight.style.opacity = '1';
        if (!animating) {
          animating = true;
          requestAnimationFrame(animate);
        }
      }
    } else {
      if (mouseActive) {
        mouseActive = false;
        gradientOverlay.classList.add('is-hidden');
        spotlight.style.opacity = '0';
        heroBg.style.transform = 'translate(0px, 0px)';
      }
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    if (mouseActive) {
      mouseActive = false;
      gradientOverlay.classList.add('is-hidden');
      spotlight.style.opacity = '0';
      heroBg.style.transform = 'translate(0px, 0px)';
    }
  });

  // ═══════════════════════════════════════
  // LOOP DE ANIMACIÓN
  // ═══════════════════════════════════════
  function animate() {
    if (!mouseActive) {
      animating = false;
      return;
    }

    currentX += (targetX - currentX) * CONFIG.smoothing;
    currentY += (targetY - currentY) * CONFIG.smoothing;

    const percX = (currentX * 100).toFixed(2);
    const percY = (currentY * 100).toFixed(2);

    gradientOverlay.style.background = `radial-gradient(
      circle ${CONFIG.spotRadius}px at ${percX}% ${percY}%,
      transparent 0%,
      rgba(0, 0, 0, ${CONFIG.midDarkness * 0.4}) 35%,
      rgba(0, 0, 0, ${CONFIG.midDarkness}) 55%,
      rgba(0, 0, 0, ${CONFIG.outerDarkness}) 100%
    )`;

    const rect = imageFrame.getBoundingClientRect();
    const spotPxX = currentX * rect.width;
    const spotPxY = currentY * rect.height;
    spotlight.style.left = `${spotPxX}px`;
    spotlight.style.top = `${spotPxY}px`;

    const parallaxX = (currentX - 0.5) * CONFIG.parallaxIntensity * -1;
    const parallaxY = (currentY - 0.5) * CONFIG.parallaxIntensity * -1;
    heroBg.style.transform = `translate(${parallaxX.toFixed(2)}px, ${parallaxY.toFixed(2)}px)`;

    requestAnimationFrame(animate);
  }
});
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
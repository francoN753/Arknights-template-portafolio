function initTacticalFlashlight() {
  const flashlight = document.getElementById('tactical-flashlight');
  if (!flashlight) return;

  // Posición inicial al centro de la pantalla
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  // Escuchar el movimiento del mouse
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Bucle de renderizado suave (60/120 FPS)
  function render() {
    // LERP: 0.08 determina la "suavidad/retardo" de la luz al perseguir el cursor
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Actualizar coordenadas en las variables CSS
    document.documentElement.style.setProperty('--light-x', `${currentX.toFixed(1)}px`);
    document.documentElement.style.setProperty('--light-y', `${currentY.toFixed(1)}px`);

    requestAnimationFrame(render);
  }

  render();
}

// Iniciar script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTacticalFlashlight);
} else {
  initTacticalFlashlight();
}
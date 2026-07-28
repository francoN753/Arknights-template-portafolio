// main.js - Versión 3D de Profundidad

document.addEventListener('DOMContentLoaded', () => {

  // 1. SELECCIÓN DE ELEMENTOS
  const spotlight = document.getElementById('spotlight');
  const chars = document.querySelectorAll('.hero-title .char');
  const heroSection = document.getElementById('hero');

  // Configuración de la inclinación
  const SENSITIVITY = 40; // Qué tan fuerte es la inclinación (divisor). Mayor número = menos tilt.
  const MAX_TILT = 20; // Ángulo máximo en grados (ej: +/- 20deg)

  // 2. EVENTO MOUSEMOVE
  heroSection.addEventListener('mousemove', (e) => {
    // Coordenadas del cursor
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // A) Mover la Luz (Spotlight) - Mantiene la lógica original
    if (spotlight) {
      spotlight.style.left = `${mouseX}px`;
      spotlight.style.top = `${mouseY}px`;
    }

    // B) Lógica de Profundidad 3D (TILT)
    chars.forEach((char) => {
      // Obtener el centro exacto de la letra actual
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      // Calcular la distancia entre el ratón y el centro de la letra
      const deltaX = mouseX - charCenterX;
      const deltaY = mouseY - charCenterY;

      // Calcular los ángulos de rotación basados en la distancia
      // deltaX (horizontal) controla rotateY (puerta)
      // deltaY (vertical) controla rotateX (persiana, invertido)
      
      let tiltY = (deltaX / (window.innerWidth / 2)) * MAX_TILT;
      let tiltX = -(deltaY / (window.innerHeight / 2)) * MAX_TILT; // El signo negativo es crucial

      // PASO C: Aplicar la inclinación 3D en ambos ejes
      char.style.transform = `rotateX(${tiltX / 4}deg) rotateY(${tiltY / 4}deg)`;
    });
  });

  // 3. RESTABLECER POSICIÓN CUANDO EL MOUSE SALE DEL HERO
  heroSection.addEventListener('mouseleave', () => {
    chars.forEach((char) => {
      char.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

});
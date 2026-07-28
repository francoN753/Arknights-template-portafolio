// js/tilt.js

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  const chars = document.querySelectorAll('.hero-title .char');
  const MAX_TILT = 20; // Ángulo máximo en grados

  if (!heroSection) return;

  heroSection.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - charCenterX;
      const deltaY = mouseY - charCenterY;

      const tiltY = (deltaX / (window.innerWidth / 2)) * MAX_TILT;
      const tiltX = -(deltaY / (window.innerHeight / 2)) * MAX_TILT;

      char.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
  });

  // Resetear inclinación al salir de la portada
  heroSection.addEventListener('mouseleave', () => {
    chars.forEach((char) => {
      char.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
});
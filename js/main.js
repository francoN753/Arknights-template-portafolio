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

// Registramos el plugin ScrollTrigger por si no está registrado
gsap.registerPlugin(ScrollTrigger);

// TIMELINE DE PERSIANAS TÁCTICAS
const shutterTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#proyectos",
        start: "top bottom", // Inicia cuando la parte superior de proyectos toca el fondo de la pantalla
        end: "+=120%",       // Distancia de scroll reservada para el bloqueo de persianas
        pin: true,           // Ancla la pantalla durante la animación
        scrub: 1             // Control suave sincronizado con la rueda del mouse
    }
});

shutterTl
    // 1. Cierre rápido de persianas (Superior baja, Inferior sube)
    .to(".shutter-top", { y: "0%", ease: "power3.inOut", duration: 0.8 })
    .to(".shutter-bottom", { y: "0%", ease: "power3.inOut", duration: 0.8 }, "<")

    // 2. Aparece la caja de estado central y llena la barra de carga
    .to(".shutter-loader", { opacity: 1, scale: 1, duration: 0.3 }, "-=0.2")
    .to(".loader-bar-fill", { width: "100%", duration: 0.6 })

    // 3. Ocultar el módulo anterior "Sobre Mí" y mostrar "Proyectos" (Detrás de puertas)
    .to(".about-section, .tactical-card", { opacity: 0, duration: 0.1 })
    .to("#proyectos", { opacity: 1, duration: 0.1 }, "<")

    // 4. Se oculta la caja de carga
    .to(".shutter-loader", { opacity: 0, scale: 0.8, duration: 0.3 })

    // 5. Apertura de las persianas (Retorno a posición original)
    .to(".shutter-top", { y: "-100%", ease: "power3.inOut", duration: 0.8 })
    .to(".shutter-bottom", { y: "100%", ease: "power3.inOut", duration: 0.8 }, "<")

    // 6. Ensamblado final en cascada de las tarjetas del nuevo apartado
    .fromTo(".section-header-hud", 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.4 }, 
        "-=0.4"
    )
    .fromTo(".project-card", 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" },
        "-=0.2"
    );
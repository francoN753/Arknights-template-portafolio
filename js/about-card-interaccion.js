// js/about-card-interaction.js — Interacción 3D Tilt de la tarjeta

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('sobre-mi');
    const tacticalCard = aboutSection.querySelector('.tactical-card');

    if (!aboutSection || !tacticalCard) return;

    // Configuración del efecto (más bajo = más sutil)
    const settings = {
        maxTilt: 8,       // Máxima rotación en grados
        maxMove: 10,      // Máximo movimiento en pixeles (paralaje)
        smoothness: 0.5   // Tiempo de suavizado de GSAP (segundos)
    };

    aboutSection.addEventListener('mousemove', (e) => {
        // 1. Obtener dimensiones y centro de la sección/tarjeta
        const { clientX, clientY } = e;
        const rect = aboutSection.getBoundingClientRect();
        
        // Calcular centro de la sección (respecto a la pantalla)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 2. Calcular la posición relativa del ratón (-1 a 1)
        // normalizedX = -1 (izquierda), 0 (centro), 1 (derecha)
        const normalizedX = (clientX - centerX) / (rect.width / 2);
        // normalizedY = -1 (arriba), 0 (centro), 1 (abajo)
        const normalizedY = (clientY - centerY) / (rect.height / 2);

        // 3. Calcular las transformaciones 3D
        // Para que "apunte" al mouse:
        // Si el mouse va a la derecha, rotamos positivamente en el eje Y
        // Si el mouse va abajo, rotamos negativamente en el eje X
        const rotateY = normalizedX * settings.maxTilt; 
        const rotateX = -normalizedY * settings.maxTilt; // Invertido para apuntar

        // Paralae sutil de posición (opcional, le da más profundidad)
        const moveX = normalizedX * settings.maxMove;
        const moveY = normalizedY * settings.maxMove;

        // 4. Aplicar transformaciones con GSAP para máxima suavidad
        gsap.to(tacticalCard, {
            x: moveX,
            y: moveY,
            rotationX: rotateX,
            rotationY: rotateY,
            duration: settings.smoothness,
            ease: "power2.out",
            overwrite: true // Evita que se acumulen animaciones
        });
    });

    // Resetear la tarjeta a su posición original al quitar el mouse
    aboutSection.addEventListener('mouseleave', () => {
        gsap.to(tacticalCard, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)" // Efecto elástico al volver
        });
    });
});
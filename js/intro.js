// js/intro.js — Control del Video de Introducción

document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-intro');

    if (!introOverlay || !introVideo) return;

    let isFinished = false;

    // Función para cerrar la intro y dar paso al portafolio
    function finishIntro() {
        if (isFinished) return;
        isFinished = true;

        introOverlay.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

        // Pausar el video tras ocultar para liberar memoria GPU/RAM
        setTimeout(() => {
            introVideo.pause();
        }, 850);
    }

    // 1. Evento al finalizar el video automáticamente
    introVideo.addEventListener('ended', finishIntro);

    // 2. Click en botón Saltar
    if (skipBtn) {
        skipBtn.addEventListener('click', finishIntro);
    }

    // 3. Atajos de teclado (ESC o Espacio)
    window.addEventListener('keydown', (e) => {
        if ((e.key === 'Escape' || e.code === 'Space') && !isFinished) {
            finishIntro();
        }
    });

    // 4. Forzar intento de reproducción si hay políticas de autoplay
    introVideo.play().catch(() => {
        console.warn('Autoplay restringido por el navegador. El usuario puede omitir manualmente.');
    });
});
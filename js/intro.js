// js/intro.js — Control Seguro del Video de Introducción

(function () {
    function initIntro() {
        const introOverlay = document.getElementById('intro-overlay');
        const introVideo = document.getElementById('intro-video');
        const skipBtn = document.getElementById('skip-intro');

        const isMobile = window.matchMedia('(max-width: 900px)').matches;

        // --- EN MÓVIL / TABLETA (<= 900px) ---
        if (isMobile) {
            // Desbloquear el scroll del body inmediatamente
            document.body.classList.remove('no-scroll');

            if (introVideo) {
                try {
                    introVideo.pause();
                    introVideo.removeAttribute('src');
                    introVideo.load();
                } catch (e) {
                    /* Ignorar excepciones si el video no cargó por red */
                }
            }

            if (introOverlay) {
                introOverlay.classList.add('is-hidden');
                if (introOverlay.parentNode) {
                    introOverlay.parentNode.removeChild(introOverlay);
                }
            }
            return; // Finaliza la ejecución en dispositivos móviles
        }

        // --- EN ESCRITORIO (> 900px) ---
        if (!introOverlay || !introVideo) {
            document.body.classList.remove('no-scroll');
            return;
        }

        let isFinished = false;

        function finishIntro() {
            if (isFinished) return;
            isFinished = true;

            introOverlay.classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

            setTimeout(() => {
                try {
                    introVideo.pause();
                } catch (e) {}
            }, 850);
        }

        introVideo.addEventListener('ended', finishIntro);

        if (skipBtn) {
            skipBtn.addEventListener('click', finishIntro);
        }

        window.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.code === 'Space') && !isFinished) {
                finishIntro();
            }
        });

        // Intentar reproducción automática
        const playPromise = introVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.warn('Autoplay bloqueado por el navegador.');
            });
        }
    }

    // Ejecución inmediata si el DOM ya se encuentra listo (evita congelamientos por caché)
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initIntro();
    } else {
        document.addEventListener('DOMContentLoaded', initIntro);
    }
})();
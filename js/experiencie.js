document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP o ScrollTrigger no están cargados.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const expSection = document.querySelector("#experiencia");
    const expTrack = document.querySelector(".exp-track");

    if (!expSection || !expTrack) return;

    // Calcular el desplazamiento exacto del contenedor horizontal
    const getScrollAmount = () => {
        let trackWidth = expTrack.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
    };

    // 💡 AJUSTA ESTE VALOR PARA CONTROLAR LA DURACIÓN DEL SCROLL:
    // 1   = Velocidad normal
    // 2   = Requiere el DOBLE de scroll para completar la animación (2-3 ruedas de mouse)
    // 2.5 = Requiere todavía más scroll y se siente más pausado/cinemático
    const MULTIPLICADOR_DISTANCIA = 1;

    // Scroll Horizontal Pin
    gsap.to(expTrack, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: "#experiencia",
            start: "top top",
            // Multiplicamos el recorrido vertical para ralentizar el avance horizontal
            end: () => `+=${expTrack.scrollWidth * MULTIPLICADOR_DISTANCIA}`,
            pin: true,
            scrub: 1.2, // Un poco más de inercia suave para mejorar la sensación al rodar
            invalidateOnRefresh: true
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP o ScrollTrigger no están cargados correctamente.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const expSection = document.querySelector("#experiencia");
    const expTrack = document.querySelector(".exp-track");
    const glitchOverlay = document.querySelector("#footer-glitch-overlay");
    const btnReboot = document.querySelector("#btn-reboot");

    if (!expSection || !expTrack) return;

    // Calcular el desplazamiento total del track horizontal
    const getScrollAmount = () => {
        let trackWidth = expTrack.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
    };

    // 1. TIMELINE DE SCROLL HORIZONTAL (OPCIÓN C)
    const expTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#experiencia",
            start: "top top",
            end: () => `+=${expTrack.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                // 2. DISPARO DE GLITCH AL LLEGAR AL FINAL DE LOS REGISTROS (OPCIÓN B)
                if (self.progress > 0.85 && glitchOverlay) {
                    if (!glitchOverlay.classList.contains("active-glitch")) {
                        glitchOverlay.classList.add("active-glitch");
                        setTimeout(() => {
                            glitchOverlay.classList.remove("active-glitch");
                        }, 450);
                    }
                }
            }
        }
    });

    expTimeline.to(expTrack, {
        x: getScrollAmount,
        ease: "none"
    });

    // 3. BOTÓN DE REINICIO DE SISTEMA (REBOOT / SCROLL AL INICIO)
    if (btnReboot) {
        btnReboot.addEventListener("click", () => {
            if (typeof lenis !== "undefined" && lenis) {
                lenis.scrollTo("#hero", { duration: 1.8 });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }
});
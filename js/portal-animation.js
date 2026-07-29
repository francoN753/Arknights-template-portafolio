document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP o ScrollTrigger no están cargados correctamente.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const shutterTop = document.querySelector(".shutter-top");
    const shutterBottom = document.querySelector(".shutter-bottom");
    const shutterLoader = document.querySelector(".shutter-loader");
    const loaderBar = document.querySelector(".loader-bar-fill");
    const projectsSection = document.querySelector("#proyectos");
    const projectCards = document.querySelectorAll(".project-card");
    const sectionHeader = document.querySelector(".section-header-hud");

    if (!projectsSection || !shutterTop || !shutterBottom) return;

    // Timeline cinemática de persianas tácticas (Cierre anticipado al aproximarse)
    const shutterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#proyectos",
            start: "top 85%",      // Cierre inmediato en cuanto la sección asoma por abajo (evita vacíos)
            end: "top 15%",        // Finaliza el ciclo de apertura antes de llegar al centro
            scrub: 0.6,            // Scrub muy fluido y receptivo con Lenis
            onLeaveBack: () => {
                // Reset limpio si se scrollea hacia arriba
                gsap.to(shutterTop, { y: "-100%", duration: 0.3 });
                gsap.to(shutterBottom, { y: "100%", duration: 0.3 });
                gsap.to(shutterLoader, { opacity: 0, scale: 0.8, duration: 0.2 });
                gsap.to(loaderBar, { width: "0%", duration: 0.2 });
            }
        }
    });

    shutterTl
        // 1. Cierre anticipado e inmediato de las persianas (0 → 0.3)
        .to(shutterTop, { y: "0%", ease: "power2.inOut", duration: 0.3 }, 0)
        .to(shutterBottom, { y: "0%", ease: "power2.inOut", duration: 0.3 }, 0)

        // 2. Muestra la ventana de carga HUD (0.3 → 0.5)
        .to(shutterLoader, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.2)" }, 0.3)

        // 3. Llenado de la barra de carga (0.5 → 1.2)
        .to(loaderBar, { width: "100%", duration: 0.7, ease: "power1.inOut" }, 0.5)

        // 4. Confirmación de carga y resplandor (1.2 → 1.4)
        .to(shutterLoader, { scale: 1.04, boxShadow: "0 0 35px rgba(248, 245, 70, 0.5)", duration: 0.2 }, 1.2)

        // 5. Ocultar el loader (1.4 → 1.6)
        .to(shutterLoader, { opacity: 0, scale: 0.85, duration: 0.2 }, 1.4)

        // 6. Apertura de persianas para revelar Proyectos (1.6 → 2.0)
        .to(shutterTop, { y: "-100%", ease: "power3.inOut", duration: 0.4 }, 1.6)
        .to(shutterBottom, { y: "100%", ease: "power3.inOut", duration: 0.4 }, 1.6)

        // 7. Despliegue en cascada de la cabecera y tarjetas de Proyectos (1.8 → 2.4)
        .fromTo(sectionHeader, 
            { opacity: 0, y: 35, filter: "blur(8px)" }, 
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }, 
            1.8
        )
        .fromTo(projectCards, 
            { opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" }, 
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", stagger: 0.15, duration: 0.4, ease: "power3.out" }, 
            2.0
        );
});
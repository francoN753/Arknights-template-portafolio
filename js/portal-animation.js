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

    // Timeline de animación
    const shutterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#proyectos",
            start: "top 35%",    // Se activa SOLO cuando 'Proyectos' sube al tercio superior de la pantalla
            end: "top 0%",       // Finaliza cuando 'Proyectos' llega al tope
            scrub: 1,            // Sincronización fluida con el scroll
            onLeaveBack: () => {
                // Asegura abrir persianas si el usuario vuelve hacia "Sobre Mí"
                gsap.to(shutterTop, { y: "-100%", duration: 0.3 });
                gsap.to(shutterBottom, { y: "100%", duration: 0.3 });
            }
        }
    });

    shutterTl
        // 1. Cierre de persianas tácticas
        .to(shutterTop, { y: "0%", ease: "power2.inOut" }, 0)
        .to(shutterBottom, { y: "0%", ease: "power2.inOut" }, 0)

        // 2. Muestra el loader HUD y llena la barra
        .to(shutterLoader, { opacity: 1, scale: 1, duration: 0.2 }, 0.3)
        .to(loaderBar, { width: "100%", duration: 0.4 }, 0.4)

        // 3. Oculta el loader
        .to(shutterLoader, { opacity: 0, scale: 0.8, duration: 0.2 }, 0.8)

        // 4. Abre las persianas para revelar Proyectos
        .to(shutterTop, { y: "-100%", ease: "power2.inOut" }, 1.0)
        .to(shutterBottom, { y: "100%", ease: "power2.inOut" }, 1.0)

        // 5. Revelado en cascada del título y las tarjetas
        .fromTo(sectionHeader, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.3 }, 
            1.1
        )
        .fromTo(projectCards, 
            { opacity: 0, y: 40, scale: 0.95 }, 
            { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }, 
            1.2
        );
});
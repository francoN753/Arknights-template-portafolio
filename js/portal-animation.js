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
    const loaderCode = document.querySelector(".loader-code");
    const projectsSection = document.querySelector("#proyectos");
    const projectCards = document.querySelectorAll(".project-card");
    const sectionHeader = document.querySelector(".section-header-hud");

    if (!projectsSection || !shutterTop || !shutterBottom) return;

    // Timeline cinemática de persianas tácticas con pin y duración extendida
    const shutterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#proyectos",
            start: "top top",      // Inicia cuando la parte superior de proyectos toca el tope
            end: "+=150%",         // Distancia de scroll amplia reservada para el protocolo de carga
            pin: true,             // Fijar la pantalla durante la secuencia de persianas
            scrub: 0.8,            // Scrub suave sincronizado con Lenis
            anticipatePin: 1,
            onLeaveBack: () => {
                // Asegura resetear persianas si el usuario scrollea hacia arriba a "Sobre Mí"
                gsap.to(shutterTop, { y: "-100%", duration: 0.4 });
                gsap.to(shutterBottom, { y: "100%", duration: 0.4 });
                gsap.to(shutterLoader, { opacity: 0, scale: 0.8, duration: 0.2 });
                gsap.to(loaderBar, { width: "0%", duration: 0.2 });
            }
        }
    });

    shutterTl
        // 1. Cierre metálico de persianas tácticas (Superior e Inferior)
        .to(shutterTop, { y: "0%", ease: "power3.inOut", duration: 0.5 }, 0)
        .to(shutterBottom, { y: "0%", ease: "power3.inOut", duration: 0.5 }, 0)

        // 2. Revelado de la ventana HUD de carga central
        .to(shutterLoader, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }, 0.4)

        // 3. Llenado pausado y progresivo de la barra de carga
        .to(loaderBar, { width: "100%", duration: 1.4, ease: "power1.inOut" }, 0.7)

        // 4. Confirmación de estado cargado (destello amarillo y pulso)
        .to(shutterLoader, { scale: 1.05, boxShadow: "0 0 45px rgba(248, 245, 70, 0.5)", duration: 0.3 }, 2.0)
        
        // 5. Ocultar la ventana de carga
        .to(shutterLoader, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, 2.3)

        // 6. Apertura cinemática de persianas
        .to(shutterTop, { y: "-100%", ease: "power3.inOut", duration: 0.6 }, 2.6)
        .to(shutterBottom, { y: "100%", ease: "power3.inOut", duration: 0.6 }, 2.6)

        // 7. Despliegue en cascada del título y tarjetas de la sección Proyectos
        .fromTo(sectionHeader, 
            { opacity: 0, y: 40, filter: "blur(10px)" }, 
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, 
            3.0
        )
        .fromTo(projectCards, 
            { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" }, 
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", stagger: 0.2, duration: 0.5, ease: "power3.out" }, 
            3.3
        );
});
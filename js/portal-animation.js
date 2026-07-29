// js/portal-animation.js

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const portalTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=180%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    portalTl
        // 1. Oculta título "NUZZO" y HUD
        .to(".hero-content, .hud-callout, .tactical-sidebar, .availability-badge-bottom, .datamatrix-corner-block", {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power1.out"
        }, 0)

        // 2. Zoom In de la figura 3D y apaga el spotlight
        .to("#cyber-core, #tactical-flashlight", {
            scale: 5,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        }, 0)

        // 3. Hace aparecer la tarjeta "Sobre Mí" en el centro exacto del fondo existente
        .fromTo(".about-section", 
            { 
                opacity: 0, 
                y: 40,
                pointerEvents: "none"
            },
            { 
                opacity: 1, 
                y: 0, 
                pointerEvents: "auto",
                duration: 0.6, 
                ease: "power2.out" 
            },
            0.5 // Aparece justo cuando la figura 3D termina de desvanecerse
        );
});
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
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    portalTl
        // 1. Oculta el título "NUZZO" y los HUD de los bordes
        .to("#glitch-title, .hero-tagline, .hero-footer-info, .hud-callout, .tactical-sidebar, .availability-badge-bottom, .datamatrix-corner-block", {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power1.out"
        }, 0)

        // 2. Desvanece la esfera 3D central
        .to("#cyber-core", {
            scale: 4,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
        }, 0)

        // 3. ATENÚA el spotlight al 15% (Luz ambiental tenue para iluminar la cuadrícula sin deslumbrar)
        .to("#tactical-flashlight", {
            opacity: 0.15,
            duration: 0.8,
            ease: "power2.in"
        }, 0)

        // 4. Muestra la tarjeta "Sobre Mí" sobre la retícula iluminada
        .fromTo("#sobre-mi", 
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
            0.4
        );
});
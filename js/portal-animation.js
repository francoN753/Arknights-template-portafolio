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
        // 1. Desvanece los textos e interfaz HUD del hero
        .to(".hero-content, .hud-callout, .tactical-sidebar, .availability-badge-bottom, .datamatrix-corner-block", {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power1.out"
        }, 0)

        // 2. Agranda y desvanece el núcleo 3D
        .to("#cyber-core", {
            scale: 5,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        }, 0)

        // 3. Desvanece progresivamente el spotlight hasta apagarlo por completo
        .to("#tactical-flashlight", {
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        }, 0);
});
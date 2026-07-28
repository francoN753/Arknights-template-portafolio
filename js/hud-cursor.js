// js/hud-cursor.js
document.addEventListener('DOMContentLoaded', () => {
    const hudCursor = document.getElementById('hud-cursor');
    const coordsDisplay = hudCursor.querySelector('.coords');
    const heroSection = document.getElementById('hero');

    if (!hudCursor || !heroSection) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        hudCursor.style.left = `${x}px`;
        hudCursor.style.top = `${y}px`;

        const pad = (num) => String(num).padStart(4, '0');
        coordsDisplay.textContent = `X:${pad(x)} Y:${pad(y)}`;
    });

    heroSection.addEventListener('mouseenter', () => {
        hudCursor.classList.add('active');
    });

    heroSection.addEventListener('mouseleave', () => {
        hudCursor.classList.remove('active');
    });
});
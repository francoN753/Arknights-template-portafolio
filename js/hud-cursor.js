// js/hud-cursor.js — Cursor Táctico HUD Global
document.addEventListener('DOMContentLoaded', () => {
    const hudCursor = document.getElementById('hud-cursor');
    if (!hudCursor) return;

    const coordsDisplay = hudCursor.querySelector('.coords');

    // Mantiene el cursor activo y rastrea coordenadas globalmente en toda la ventana
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        hudCursor.style.left = `${x}px`;
        hudCursor.style.top = `${y}px`;

        if (!hudCursor.classList.contains('active')) {
            hudCursor.classList.add('active');
        }

        if (coordsDisplay) {
            const pad = (num) => String(num).padStart(4, '0');
            coordsDisplay.textContent = `X:${pad(x)} Y:${pad(y)}`;
        }

        // Efecto táctico de enfoque (.hovering) sobre elementos interactivos
        const target = e.target;
        if (target && target.closest && target.closest('a, button, .project-card, .tactical-card, .skip-intro-btn, .nav-toggle')) {
            hudCursor.classList.add('hovering');
        } else {
            hudCursor.classList.remove('hovering');
        }
    });

    document.addEventListener('mouseleave', () => {
        hudCursor.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
        hudCursor.classList.add('active');
    });
});
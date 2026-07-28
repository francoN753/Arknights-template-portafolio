// js/glitch.js — Efecto Glitch Táctico Perpetuo

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('glitch-title');
    if (!title) return; // Seguridad: si el título no existe, no hace nada.

    const chars = title.querySelectorAll('.char');

    // Caracteres para el efecto (Hexadecimal, Binario y Táctico)
    const glitchChars = '0123456789ABCDEF!$[]//X#';

    chars.forEach(char => {
        // Definimos 'interval' en el scope de cada letra para poder limpiarlo después
        let interval = null;
        const originalChar = char.getAttribute('data-char');

        char.addEventListener('mouseenter', () => {
            // Limpiar intervalo anterior si existe (por seguridad)
            clearInterval(interval);

            // Activamos el color amarillo y el resplandor táctico
            char.classList.add('is-glitching');

            // Iniciamos un loop de animación indefinido
            interval = setInterval(() => {
                // Cambiar el texto de la letra por uno aleatorio de la cadena táctica
                char.innerText = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                
                // NOTA: Hemos eliminado la condición de parada (iteration).
                // El glitch continuará hasta que se mueva el mouse.
            }, 60); 
        });

        char.addEventListener('mouseleave', () => {
            // Limpiar el intervalo para detener la animación
            clearInterval(interval);

            // Restaurar el carácter original y el color blanco
            char.innerText = originalChar;
            char.classList.remove('is-glitching');
        });
    });
});
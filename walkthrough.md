# Spotlight Warhol — Cambios Realizados

## Resumen

Se implementó el efecto de **spotlight/foco de luz estilo Warhol** que revela la imagen solo donde está el cursor del mouse, contenido dentro del recuadro de la imagen.

## Técnica Utilizada (Idéntica a Warhol)

La página de Warhol usa un **overlay oscuro con un `radial-gradient` dinámico** que actúa como "agujero de luz". Así es como funciona:

```
┌──────────────────────────────────┐
│  hero-image-frame (overflow:hidden) │  ← El marco. Nada sale de aquí.
│  ┌────────────────────────────┐  │
│  │  hero-bg (la foto)         │  │  ← Capa 0: Tu foto, siempre visible al 100%
│  ├────────────────────────────┤  │
│  │  hero-gradient-overlay     │  │  ← Capa 1: Div negro con un agujero radial
│  │  ████████████████████████  │  │     que sigue el cursor
│  │  ██████████      ████████  │  │
│  │  █████████  ●FOCO ███████  │  │  ← El gradiente va de transparente → negro
│  │  ██████████      ████████  │  │
│  │  ████████████████████████  │  │
│  ├────────────────────────────┤  │
│  │  hero-spotlight (tinte)    │  │  ← Capa 2: Tinte sutil verde oliva
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

## Archivos Modificados

### [style.css](file:///c:/Users/franc/OneDrive/Documents/Aplicaciones/Proyectos/Portafolio/style.css)
- Reemplazó el sistema antiguo de `mask-image` por el sistema de overlay con `radial-gradient`
- Nuevo selector `.hero-gradient-overlay` con estado `.is-hidden`
- La foto (`hero-bg`) ahora tiene `filter: grayscale(30%) contrast(110%) brightness(110%)` para un look cinematográfico
- Eliminada la clase `.hero-ambient` (ya no necesaria)

### [index.html](file:///c:/Users/franc/OneDrive/Documents/Aplicaciones/Proyectos/Portafolio/index.html)
- Reemplazó `hero-ambient` por `hero-gradient-overlay` con id `gradientOverlay`
- Agregó ids a `hero-bg` y nuevo overlay
- Eliminó scripts duplicados y el `main.js` (su lógica estaba duplicada en spotlight.js y tilt.js)

### [spotlight.js](file:///c:/Users/franc/OneDrive/Documents/Aplicaciones/Proyectos/Portafolio/js/spotlight.js)
- Reescrito completamente con la técnica Warhol
- **Lerp smoothing** con `requestAnimationFrame` para movimiento fluido
- **Snap inicial** del cursor (no "viaja" desde el centro al entrar)
- **Parallax sutil** en la imagen (se mueve ligeramente en dirección opuesta al cursor)
- **Confinamiento perfecto**: el spotlight no puede salir del recuadro de la imagen

## Configuración Ajustable

En `spotlight.js`, el objeto `CONFIG` te permite afinar:

| Parámetro | Default | Qué hace |
|---|---|---|
| `spotRadius` | 180px | Tamaño del círculo de luz |
| `penumbraFade` | 2.2 | Extensión de la penumbra |
| `smoothing` | 0.12 | Suavidad del movimiento (menor = más lento) |
| `parallaxIntensity` | 15px | Cuánto se mueve la imagen |
| `outerDarkness` | 0.97 | Qué tan negro es el borde |
| `midDarkness` | 0.88 | Qué tan oscura es la penumbra |

## Para Probar

Abre `index.html` en el navegador y mueve el mouse sobre el recuadro central. Deberías ver:
1. La imagen completamente oscura al inicio
2. Al mover el mouse sobre el recuadro, un foco circular revela la foto
3. El foco sigue el cursor con movimiento suave
4. El foco NO puede salir del recuadro
5. La imagen se mueve ligeramente en parallax

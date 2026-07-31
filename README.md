# ⚡ FORMULA FN // Tactical Cyberpunk Portfolio

![Status](https://img.shields.io/badge/SYS__STATUS-ACTIVE-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/SYS__VER-2.6.0-F8F546?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-DUAL-blue?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/🌐_DEMO-PROBAR_EN_VIVO-FF0055?style=for-the-badge&logo=githubpages&logoColor=white)](https://francon753.github.io/Arknights-template-portafolio/)

> 🌐 **DESPLIEGUE EN VIVO / LIVE DEMO:**
> Experimenta la interfaz interactiva directamente en tu navegador:  
> 👉 **[francon753.github.io/Arknights-template-portafolio](https://francon753.github.io/Arknights-template-portafolio/)**

---

Un portafolio web interactivo de alto rendimiento enfocado en una **experiencia táctica, cinemática e inmersiva** con estética HUD / Cyberpunk. Diseñado con microinteracciones avanzadas, renderizado 3D en tiempo real y transiciones orgánicas mediante scroll.

---

## 👁️ Resumen Visual & Concepto

Este proyecto combina la potencia de animaciones avanzadas con una interfaz de usuario inspirada en consolas de control tácticas y HUDs militares ciberpunk.

* **Transición Cinemática ("Tactical Breach"):** Desvanecimiento suave del Hero con desplazamiento dinámico hacia la tarjeta de personal (`PERSONNEL_FILE`).
* **Núcleo 3D Interactivo:** Esfera/Cyber-Core renderizado con **Three.js** que reacciona a la interacción.
* **Línea de Tiempo Horizontal:** Sección de experiencia laboral con scroll horizontal bloqueado (*pinning*).
* **Smooth Scroll Táctico:** Control de inercia fluido optimizado con **Lenis Scroll**.
* **Modales & Componentes HUD:** Tarjetas de contacto, cursor personalizado con coordenadas en tiempo real y paneles retroiluminados.

---

## 🛠️ Tech Stack & Herramientas

| Categoría | Tecnologías Utilizadas |
| :--- | :--- |
| **Core** | HTML5, CSS3, JavaScript (ES6+) |
| **Animaciones & FX** | GSAP 3 (ScrollTrigger), Lenis Smooth Scroll |
| **Gráficos 3D** | Three.js |
| **Hosting / Demo** | GitHub Pages |
| **Tipografía** | Bebas Neue, Space Grotesk, Plus Jakarta Sans |

---

## 📁 Estructura del Proyecto

```text
├── assets/                  # Logos, videos, fuentes y recursos gráficos
│   └── Intro.mp4
├── js/                      # Lógica de scripts y animaciones
│   ├── about-card-interaccion.js
│   ├── contact.js
│   ├── cyber-core.js        # Configuración de la esfera Three.js
│   ├── experience.js        # Timeline con ScrollTrigger horizontal
│   ├── glitch.js
│   ├── hud-cursor.js        # Cursor táctico con tracking X/Y
│   ├── parallax.js          # Control de capas Parallax y transición Hero
│   ├── portal-animation.js
│   ├── scroll.js            # Configuración de Lenis Scroll
│   ├── spotlight.js         # Efecto linterna táctica
│   └── tilt.js
├── index.html               # Estructura principal
├── style.css                # Sistema global de diseño e interfaz HUD
└── README.md
```
## ⚖️ Licencia y Términos de Uso

Este proyecto cuenta con una licencia **Personal / No Comercial**.

- 🟢 **Uso Gratuito:** Portafolios personales, estudiantes y proyectos sin fines de lucro.
- 🔴 **Uso Comercial:** Si vas a usar esta plantilla para un cliente o proyecto comercial, adquiere una escribiendo a franconuzzon2007@gmail.com.

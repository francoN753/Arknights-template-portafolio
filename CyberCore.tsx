'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberCore() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- 1. ESCENA, CÁMARA Y RENDERER ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // --- 2. CREACIÓN DE LA MALLA (ICOSEDRO WIREFRAME + NODOS) ---
    const group = new THREE.Group();

    // Capa Externa: Icosaedro Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x444444, // Gris técnico sutil (para no molestar al texto)
      wireframe: true,
      transparent: true,
      opacity: 0.18,   // Mantiene alta visibilidad para las letras frontales
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Capa Interna: Núcleo Denso
    const innerGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xccff00, // Verde/Amarillo Neón táctico de tu interfaz
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    scene.add(group);

    // --- 3. SEGUIMIENTO DEL CURSOR CON SMOOTHING (LERP) ---
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- 4. REDIMENSIONAMIENTO ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- 5. BUCLE DE ANIMACIÓN ---
    let animationFrameId: number;

    const animate = () => {
      // Rotación constante de fondo
      outerMesh.rotation.y += 0.0015;
      outerMesh.rotation.x += 0.001;
      innerMesh.rotation.y -= 0.003;

      // Inclinación reactiva al cursor (Interpolación LERP)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5;
      group.rotation.x = targetY * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
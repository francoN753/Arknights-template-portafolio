function initCyberCore() {
  const container = document.getElementById('cyber-core');
  if (!container) return;

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
  container.appendChild(renderer.domElement);

  // --- 2. CREACIÓN DE LA MALLA (ICOSAEDROS) ---
  const group = new THREE.Group();

  // Esfera externa wireframe
  const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x666666, // Gris visible pero suave
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  group.add(outerMesh);

  // Núcleo interno amarillo/verde táctico
  const innerGeo = new THREE.IcosahedronGeometry(1.0, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xccff00,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerMesh);

  scene.add(group);

  // --- 3. SEGUIMIENTO DEL CURSOR ---
  let targetX = 0;
  let targetY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- 4. BUCLE DE ANIMACIÓN ---
  function animate() {
    requestAnimationFrame(animate);

    // Rotación pasiva
    outerMesh.rotation.y += 0.0015;
    outerMesh.rotation.x += 0.001;
    innerMesh.rotation.y -= 0.003;

    // Inclinación suave reactiva al mouse
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    group.rotation.y = targetX * 1.5;
    group.rotation.x = targetY * 1.5;

    renderer.render(scene, camera);
  }

  animate();
}

// Ejecutar cuando el HTML haya cargado por completo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCyberCore);
} else {
  initCyberCore();
}
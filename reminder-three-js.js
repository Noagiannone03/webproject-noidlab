// --- Three.js setup ---
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'three-canvas';
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);

// Création de la courbe
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(40, 0, 0),
  new THREE.Vector3(15, 7, 0),
  new THREE.Vector3(0, -8, 0),
  new THREE.Vector3(-15, -4, 0),
  new THREE.Vector3(-24, -5, 0),
  new THREE.Vector3(-34, -10, 0),
  new THREE.Vector3(-35, -14, 0)
]);
const tubularSegments = 30000;
const radius = 0.6;
const radialSegments = 20;
const closed = false;
const tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, closed);
const totalIndices = tubeGeometry.index.count;
const minDrawFraction = 0.2;
const initialDrawCount = Math.floor(totalIndices * minDrawFraction);
tubeGeometry.setDrawRange(0, initialDrawCount);

// Couleurs le long du tube
const colors = [];
const posAttr = tubeGeometry.attributes.position;
const startColor = [0, 0, 0.5];
const endColor = [0, 0.75, 1];
for (let i = 0, l = posAttr.count; i < l; i++) {
  const t = i / (l - 1);
  const r = startColor[0]*(1-t) + endColor[0]*t;
  const g = startColor[1]*(1-t) + endColor[1]*t;
  const b = startColor[2]*(1-t) + endColor[2]*t;
  colors.push(r, g, b);
}
tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const tubeMaterial = new THREE.MeshPhysicalMaterial({
  vertexColors: true,
  metalness: 0.1,
  roughness: 0.5,
  clearcoat: 0.2,
  clearcoatRoughness: 0.1,
  flatShading: true
});
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
scene.add(tubeMesh);

// Cap arrondi (la "boule")
const capGeometry = new THREE.SphereGeometry(radius, 16, 16);
const capMaterial = tubeMaterial.clone();
const capMesh = new THREE.Mesh(capGeometry, capMaterial);
scene.add(capMesh);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animateScene() {
  requestAnimationFrame(animateScene);
  renderer.render(scene, camera);
}
animateScene();

// --- Gestion du scroll pour la caméra ---
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const scrollable = document.body.scrollHeight - window.innerHeight;
  const scrollRatio = scrollY / scrollable;

  // Accélérer le défilement de la caméra : augmentez les multiplicateurs ici
  const cameraFactor = 1.3; // vous pouvez augmenter cette valeur pour accélérer
  camera.position.y = -30 * scrollRatio * cameraFactor;  // passage de 20 à 30 pour accélérer

  const newCount = initialDrawCount + Math.floor((totalIndices - initialDrawCount) * scrollRatio);
  tubeGeometry.setDrawRange(0, newCount);

  let fraction = scrollRatio <= 0 ? minDrawFraction : minDrawFraction + (1 - minDrawFraction) * scrollRatio;
  const spherePos = curve.getPointAt(fraction);
  capMesh.position.copy(spherePos);
});

// GSAP pour animer la caméra avec scrollTrigger (vous pouvez aussi ajuster scrub et duration ici)
gsap.to(camera.position, {
  y: -15,  // valeur cible (peut être ajustée)
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

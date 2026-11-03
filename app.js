// 1. SCROLL INERCIAL CON LENIS + GSAP SCROLLTRIGGER
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 2. CAMBIO DE TEMA FLUIDO AL HACER SCROLL
gsap.utils.toArray('.panel').forEach((panel) => {
  const theme = panel.getAttribute('data-theme');
  
  ScrollTrigger.create({
    trigger: panel,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => updateTheme(theme),
    onEnterBack: () => updateTheme(theme)
  });
});

function updateTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }
}

// 3. FONDO 3D THREE.JS OPTIMIZADO
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 16;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.013,
  color: 0xccff00,
  transparent: true,
  opacity: 0.35
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 3.5;

const clock = new THREE.Clock();
function animate3D() {
  requestAnimationFrame(animate3D);
  const elapsedTime = clock.getElapsedTime();

  particlesMesh.rotation.y = elapsedTime * 0.02;
  particlesMesh.rotation.x = elapsedTime * 0.01;

  renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 4. TRANSICIÓN DE CORTINA DE PÁGINA CON REDIRECCIÓN REAL
function triggerCurtain(event, targetUrl) {
  event.preventDefault();
  const curtain = document.getElementById('page-curtain');
  
  gsap.to(curtain, {
    y: '0%',
    duration: 0.55,
    ease: 'power4.inOut',
    onComplete: () => {
      window.location.href = targetUrl;
    }
  });
}

// 5. MANEJADOR DE ENVÍO DE REGISTRO
function handleRegister(event) {
  event.preventDefault();
  alert('¡Solicitud de registro enviada con éxito al sistema de Pulse Media! Nos pondremos en contacto.');
  event.target.reset();
}

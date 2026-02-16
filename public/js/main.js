const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const count = 3000;
const positions = new Float32Array(count * 3);

for(let i=0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 80;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    color: '#00f2ff',
    transparent: true,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 25;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Auto rotation
    particlesMesh.rotation.y += 0.001;
    
    // Mouse sway
    particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.05;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
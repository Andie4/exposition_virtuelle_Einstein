import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById("bombe");

// Création de la scène
const scene = new THREE.Scene();

// Ajout d'une caméra
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(100, aspect, 0.1, 100);
camera.position.set(0, 3, 8);

// Utilisation du canvas pour le renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Chargement du modèle 3D 
/////////--> cette partie la à été faite avec chatGPT
const loader = new GLTFLoader();
loader.load(
    'models/bombe/bomb_shading_v005.obj',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0.1, -2, -1);
        scene.add(model);
        console.log("Modèle chargé !");
    },
    (xhr) => {
        console.log(`Chargement: ${(xhr.loaded / xhr.total) * 100}% terminé`);
    },
    (error) => {
        console.error("Erreur lors du chargement du modèle :", error);
    }
);
/////////


// light 
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

const clock = new THREE.Clock();


//point central du code 
const center = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    // new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(center);

//orbit control

const controls = new OrbitControls(camera, renderer.domElement);
controls.autorotate = true;


// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajustement du canvas si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

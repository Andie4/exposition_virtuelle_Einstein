import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const mouse = new THREE.Vector2(1,1);
document.addEventListener('mousemove', onMouseMove , false);

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

// scene
const scene = new THREE.Scene();

///////////////////////////////////////////////////////////////////////
// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xff00, 1);
light.position.set(10, 10, 15);
scene.add(light);

///////////////////////////////////////////////////////////////////////
// //point central du code 
// const center = new THREE.Mesh(
//     new THREE.BoxGeometry(0.1, 0.1, 0.1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// scene.add(center);


// resize.js

 const onResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', onResize);


// Configuration de la caméra
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);
camera.position.set(0, -0.5, 1.5);
camera.lookAt(scene.position);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.autorotate = true;

///////////////////////////////////////////////////////////////////////

// Chargement du modèle 3D 
const loader = new GLTFLoader();
loader.load(
    'models/lobby.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotateY(5);
        scene.add(model);
        console.log("Modèle chargé");
    },
    (xhr) => {
        console.log(`Chargement terminé`);
    },
    (error) => {
        console.error("Erreur lors du chargement du modèle :", error);
    }
);


const raycaster = new THREE.Raycaster();

document.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        console.log(intersects[0].object.name);

        if (intersects[0].object.name === "boussoleEcran") {
            window.location.href = "boussole.html";
        }
        if (intersects[0].object.name === "journalEcran") {
            window.location.href = "journal.html";
        }
        if (intersects[0].object.name === "balleEcran") {
            window.location.href = "balle.html";
        }
        if (intersects[0].object.name === "cosmologieEcran") {
            window.location.href = "cosmos.html";
        }
        if (intersects[0].object.name === "bombe") {
            window.location.href = "bombe.html";
        }
    }
});


///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);



    renderer.render(scene, camera);
}

animate();

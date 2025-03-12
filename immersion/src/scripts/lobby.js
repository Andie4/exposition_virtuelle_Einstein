import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Fonction pour générer un nombre aléatoire
const getRandomInt = (max)=> {
    return Math.floor(Math.random() * max);
};


const origin = new THREE.Vector3(0, 0, 0);
const direction = new THREE.Vector3(1, 1, 1);
direction.normalize();

const raycaster = new THREE.Raycaster(origin, direction, 0, 100);


const mouse = new THREE.Vector2(1,1);
document.addEventListener('mousemove', onMouseMove , false);

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

///////////////////////////////////////////////////////////////////////////////////////////

// scene
const scene = new THREE.Scene();
///////////////////////////////////////////////////////////////////////////////////////////


// Chargement du modèle 3D 
/////////--> cette partie la à été faite avec chatGPT
const loader = new GLTFLoader();
loader.load(
    'models/lobby.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 1.5);
        model.rotateY(5);
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






///////////////////////////////////////////////////////////////////////////////////////////
// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xff00, 1);
light.position.set(10, 10, 15);
scene.add(light);

///////////////////////////////////////////////////////////////////////////////////////
// matériaux / géométries
const boxGeometry = new THREE.BoxGeometry();
const torusGeometry = new THREE.TorusGeometry();
const cylinderGeometry = new THREE.CylinderGeometry();

const materialCube = new THREE.MeshPhongMaterial({ color: 1228002 }); //-->  cmjn
const materialTorus = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
const materialCylinder = new THREE.MeshPhongMaterial({ color: 2043028 });


///////////////////////////////////////////////////////////////////////////////////////

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
camera.position.set(1, -1, 3);
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




////////////////////////////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);



    renderer.render(scene, camera);
}



animate();

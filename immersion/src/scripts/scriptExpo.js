import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const mouse = new THREE.Vector2(1,1);
document.addEventListener('mousemove', onMouseMove , false);
const raycaster = new THREE.Raycaster();


function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

// scene
const scene = new THREE.Scene();
scene.position.set(0,1.05,2)

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 6);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, -16, 1);
scene.add(light);


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
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5000);
camera.position.set(0, 0,4);
camera.lookAt(scene.position);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
const maxAzimuthAngle = Math.PI / 10;
const minAzimuthAngle = -Math.PI / 8;
controls.maxAzimuthAngle = maxAzimuthAngle;
controls.minAzimuthAngle = minAzimuthAngle;

const maxPolarAngle = Math.PI / 2;
const minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = maxPolarAngle;
controls.minPolarAngle = minPolarAngle;



//////////////////////////////////////////////////////////////////////////

// Chargement du modèle 3D 
const loader = new GLTFLoader();
loader.load(
    'models/intro-F.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -0.0008, 0);
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







// const EinsteinLoader = new THREE.TextureLoader();
// var treetexture = loader.load( 'tv1_einstein_boussole.png');
// treetexture.magFilter = THREE.NearestFilter;

// var treematerial = new THREE.SpriteMaterial( { map: treetexture } );
// var treesprite = new THREE.Sprite( treematerial );

// treesprite.scale.set( 1, 2, 1);
// treesprite.position.set(0, 1, 0);
// scene.add(treesprite);




///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

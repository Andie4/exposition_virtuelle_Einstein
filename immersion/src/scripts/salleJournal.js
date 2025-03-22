import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Splitting from 'splitting';


function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

// scene
const scene = new THREE.Scene();
scene.rotateY(1);

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, -8, 1);
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
camera.position.set(-0.8, 1, 0.01);

camera.lookAt(scene);
scene.add(camera);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autorotate = true;

const maxAzimuthAngle = Math.PI + 10.4;
const minAzimuthAngle = -Math.PI - 8.5;
controls.maxAzimuthAngle = maxAzimuthAngle;
controls.minAzimuthAngle = minAzimuthAngle;

const maxPolarAngle = Math.PI / 2.5;
const minPolarAngle = Math.PI / 2.5;
controls.maxPolarAngle = maxPolarAngle;
controls.minPolarAngle = minPolarAngle;

//////////////////////////////////////////////////////////////////////////

// Chargement du modèle 3D 
const loader = new GLTFLoader();
loader.load(
    'models/salleJournal.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -0.0008, 0);
        model.rotateY(-3);
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

const map = new THREE.TextureLoader().load( 'media/tv2_einstein_bureau.png' );
const material = new THREE.SpriteMaterial( { map: map } );

const sprite = new THREE.Sprite( material );
sprite.position.set( 0., -0.49, -1);
scene.add( sprite );



// mettre le son sur pause 
window.onload = function() {
    const buttonMute = document.getElementById("buttonDemute");
    const buttonDemute = document.getElementById("buttonMute");
    
    const audio = document.getElementById("audio");
    buttonMute.onclick = function()
		{
			audio.muted=true;
			buttonMute.style.display="none";
			buttonDemute.style.display="inline-block";
		};
    buttonDemute.onclick = function()
    	{
    		audio.muted=false;
			buttonMute.style.display="inline-block";
			buttonDemute.style.display="none";
    	};
};

// Effet avec le texte letrre par lettre 
Splitting(5);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// cacher le texte par defaut
document.getElementById("blocText").style.display = "none";


document.addEventListener("mousedown", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        console.log(`objets: ${clickedObject.name}`);


        if (clickedObject.name === "Cube112") {
                // afficher le texte 
                document.getElementById("blocText").style.display = "block";
                
        }
    }
});

///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

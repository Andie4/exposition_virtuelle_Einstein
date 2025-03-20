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

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 6);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 15);
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
const camera = new THREE.PerspectiveCamera(75, aspect, 0.5, 5000);
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
//////////////////////////////////////////////////////////////////////

// appel d'un objet 3d en fonction de celui qui à été cliqué
const objetSelectionne = localStorage.getItem("objetSelectionne");
console.log(objetSelectionne);
    if (!objetSelectionne) {
        console.error("Aucun objet sélectionné");
        window.location.href = "lobby.html";
    }


const loader = new GLTFLoader();
loader.load(
    `models/${objetSelectionne}.glb`,
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

// //si l'objet est en svg
//     const objetsSVG = {
//         "ecranCosmos": "images/cosmos.svg",
//         "ecranJournal": "images/journal.svg"
//     };

//     // adapte l'image a afficher
//     if (objetsSVG[objetSelectionne]) {
//         document.getElementById("imageSVG").src = objetsSVG[objetSelectionne];
//     }



document.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        window.location.href = `${objetSelectionne}.html`; 
    }
});



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



///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);



    renderer.render(scene, camera);
}

animate();

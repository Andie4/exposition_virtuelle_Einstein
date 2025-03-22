import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Splitting from "splitting";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";	


// scene
const scene = new THREE.Scene();

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, -8, 1);
scene.add(light);

// Configuration de la caméra
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);
camera.position.set(0, -0.00005, 0);
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

///////////////////////////////////////////////////////////////////////////////



// var video = document.getElementById("background-video");

// var btn = document.getElementById("btnVideo");


// function playAndPause () {

// if (video.paused) {

// video.play();

// btn.innerHTML = "Pause II";

// } else {

// video.pause();

// btn.innerHTML = "Play ▶";

// }

// }


// Effet avec le texte letrre par lettre 

// Effet avec le texte letrre par lettre 
Splitting(2);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// cacher le texte par defaut
document.getElementById("blocText").style.display = "none";

// fonction pour afficher le texte
function showText() {
	document.getElementById("blocText").style.display = "block";

}
// afficher le texte après 10 secondes 
setTimeout(showText, 10);
                



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

////////////////////////////////////////
function animate() {

}
animate();
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

// nav burger sur toutes les tailles de navigateur
var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}


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


//cette partie à été faite avec l'aide de chatGPT car il y avais un conflit entre mon data-translate-key="texteBoussole" et data-splitting
// Effet avec le texte letrre par lettre 
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'fr';

    fetch(`trad/${savedLanguage}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-translate-key]').forEach(element => {
                const key = element.getAttribute('data-translate-key');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });

            setTimeout(() => {
                Splitting();
            }, 100);
        })
        .catch(error => console.error("Erreur de chargement de la langue :", error));
});




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


document.addEventListener('DOMContentLoaded', function () {
    if (!window.location.href.includes("lobby.html")) {
        const boutonRetour = document.getElementById('boutonRetour');
        if (boutonRetour) {
            console.log("Bouton retour trouvé !");

            boutonRetour.addEventListener('click', function (event) {
                event.preventDefault();

                console.log("Bouton retour cliqué !");

                incrementChapterCount();

                setTimeout(() => {
                    window.location.href = "lobby.html";
                }, 200);
            });
        } else {
            console.log("Bouton retour introuvable !");
        }
    }
    if (window.location.href.includes("lobby.html")) {
        updateLobby();
    }
});

function getCompletedChaptersCount() {
    const count = localStorage.getItem("completedChaptersCount");
    console.log("Chapitre(s) complété(s) récupéré(s) :", count);

    return parseInt(count || "0");  
}

function incrementChapterCount() {
    let completedCount = getCompletedChaptersCount();
    completedCount++; 
    console.log("Incrémentation du compteur, nouveau compte :", completedCount);

    localStorage.setItem("completedChaptersCount", completedCount);
    updateLobby();  
}

function updateLobby() {
    const completedCount = getCompletedChaptersCount();
    console.log("Mise à jour du lobby, chapitres complétés :", completedCount);

    const progressElement = document.getElementById("chapterProgress");

    if (progressElement) {
        progressElement.innerText = `${completedCount} chapitre(s) sur 5 complétés`;
    }
}


////////////////////////////////////////
function animate() {

}
animate();
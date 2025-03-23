import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Splitting from 'splitting';
// scene
const scene = new THREE.Scene();
scene.position.set(0,1.3,1.8)
scene.rotateY(11);

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 20);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 19);
light.position.set(0, -8, 1);
scene.add(light);


// Configuration de la caméra
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5000);
camera.position.set(0, 1.5, 2);

// Configuration du renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbit control
const controls = new OrbitControls(camera, renderer.domElement);

///////////////////////////////////////////////////////////////////////
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



let textureVideo = null;
const video = document.getElementById('video');
video.muted = true;

textureVideo = new THREE.VideoTexture(video);
textureVideo.minFilter = THREE.LinearFilter;    
textureVideo.magFilter = THREE.LinearFilter;    
textureVideo.format = THREE.RGBFormat;        

// Chargement du modèle 3D 
const loader = new GLTFLoader();
loader.load(
    'models/salleBombe.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        console.log("✅ Modèle chargé");

        //objet 3d avec le nom ecrantv
        const tvScreen = model.getObjectByName("ecranTV");
        if (tvScreen) {
            tvScreen.material = new THREE.MeshBasicMaterial({ 
                map: textureVideo, 
                side: THREE.DoubleSide,
                toneMapped: false
            });
        } else {
            // console.eror("Erreur pour trouver l'obj 3D ecrantv");
        }
    },
    undefined,
    (error) => console.error("Erreur affiche du model :", error)
);

//lancer la video
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener("mousedown", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        console.log(`objets: ${clickedObject.name}`);

        if (clickedObject.name === "ecranTV") {
                video.play();
                console.log("video en cours");
                
        }
    }
});

// afficher le texte 
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


        if (clickedObject.name === "Pencil_Цилиндр004") {
                // afficher le texte 
                document.getElementById("blocText").style.display = "block";
                
        }
    }
});
 
//effet typewritter
//cette partie à été faite avec l'aide de chatGPT car il y avais un conflit entre mon data-translate-key="texteBoussole" et data-splitting
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



///////////////////////////////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    textureVideo.needsUpdate = true;
    renderer.render(scene, camera);
}
animate();

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
scene.position.set(-0.1,-0.001,0.4)

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
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
const camera = new THREE.PerspectiveCamera(75, aspect, 0.5, 5000);
camera.position.set(1, 0, 1.8);
camera.lookAt(scene.position);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
const maxAzimuthAngle = Math.PI / 15;
const minAzimuthAngle = -Math.PI / 15;
controls.maxAzimuthAngle = maxAzimuthAngle;
controls.minAzimuthAngle = minAzimuthAngle;

const maxPolarAngle = Math.PI / 2;
const minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = maxPolarAngle;
controls.minPolarAngle = minPolarAngle;


// controls.autorotate = true;

//////////////////////////////////////////////////////////////////////
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



// Chargement du modèle 3D 
const loader = new GLTFLoader();
loader.load(
    'models/salleLobby.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0.3, 0.2);
        model.rotateY('4.8');
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

const objetLiens = [
    { 
        name: "ecranBoussole", 
        objet: "boussole",  },
    {
        name: "ecranBalle",
        objet: "balle"
    },
    {
        name:"ecranJournal",
        objet: "journal"},
    {
        name: "ecranBombe",
        objet: "bombe"},
    {
        name: "ecranCosmos",
        objet: "cosmos"
    }
];

const raycaster = new THREE.Raycaster();

document.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object.name;
        const foundObject = objetLiens.find(obj => obj.name === clickedObject);
        if (foundObject) {
            localStorage.setItem("objetSelectionne", foundObject.objet);
            console.log("Objet selectionné : ", foundObject.objet);
            window.location.href = "objets.html"; 
        }
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


// progression et pop-up pour la resa ou pour refaire 
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.href.includes("lobby.html")) {
        updateLobby();
    }
});

// nombre de chapitres complétés
function getCompletedChaptersCount() {
    const count = localStorage.getItem("completedChaptersCount");
    console.log("Chapitre(s) complété(s) récupéré(s) :", count);
    return parseInt(count || "0");  
}

// Fonction pour mettre à jour la progression du lobby
function updateLobby() {
    const completedCount = getCompletedChaptersCount();
    console.log("chapitres faits :", completedCount);

    const progressElement = document.getElementById("chapterProgress");
    if (progressElement) {
        progressElement.innerHTML = `<p class="chapterProgress">${completedCount} chapitre(s) sur 5 complétés </p>`;
    }

    // Si le compteur atteint 5, afficher le pop-up
    if (completedCount === 5) {
        showCompletionPopup();
    }
}

// pop-up
function showCompletionPopup() {
    console.log("les 5 chapitres sont faits");

    const popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popup-container">
            <h1 class="title">Félicitations ! Vous avez terminé tous les chapitres.</h1>
            <button class="buttonPopup" id="reserveButton">Réserver une place pour l'expo physique</button>
            <button class="buttonPopup" id="restartButton">Recommencer l'expo virtuelle</button>
        </div>
    `;
    document.body.appendChild(popup);

    // redirection
    document.getElementById("reserveButton").addEventListener("click", () => {
        window.location.href = "formulaire.php"; 
    });
    document.getElementById("restartButton").addEventListener("click", () => {
        resetChapters(); 
        document.body.removeChild(popup);
        localStorage.clear();
        window.location.href = "index.html"; 
        localStorage.clear();

    });
}

//réinitialiser les chapitres
function resetChapters() {
    console.log("Réinitialisation du compteur");
    localStorage.setItem("completedChaptersCount", 0);
    updateLobby(); 
}


///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();


// localStorage.clear();
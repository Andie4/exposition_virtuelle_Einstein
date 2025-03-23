import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import Splitting from 'splitting';



function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

// scene
const scene = new THREE.Scene();
scene.position.set(0,-0.3,1.3)

// lumieres
const ambientLight = new THREE.AmbientLight(0xffffff, 4);
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
camera.position.set(0, -0.5, 1.5);
camera.lookAt(scene.position);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//composer / post processing
const composer = new EffectComposer(renderer);

//
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
//


composer.addPass(new FilmPass(1, false)); //grain


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
    'models/salleBoussole.glb',
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


const map = new THREE.TextureLoader().load( 'media/tv1_einstein_boussole.png' );
const material = new THREE.SpriteMaterial( { map: map } );

const sprite = new THREE.Sprite( material );

sprite.position.set( -0.5, 0, -1);
sprite.scale.set( 0.6, 0.6, 0 );
scene.add( sprite );


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


        if (clickedObject.name === "Pintura_Plane_3") {
                // afficher le texte 
                document.getElementById("blocText").style.display = "block";
                
        }
    }
});


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
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
}

animate();

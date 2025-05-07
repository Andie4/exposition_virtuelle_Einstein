import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
};

// scene
const scene = new THREE.Scene();
scene.position.set(0,0,0);

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
camera.position.set(0.9,0.5,0.1);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = Math.PI / 4;  
controls.maxPolarAngle = Math.PI / 1.5;  



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



let textureVideo = null;
const video = document.getElementById('videoIntro');
video.muted = true;

textureVideo = new THREE.VideoTexture(video);
textureVideo.minFilter = THREE.LinearFilter;    
textureVideo.magFilter = THREE.LinearFilter;    
textureVideo.format = THREE.RGBFormat;       

// Chargement du modèle 3D 
const loader = new GLTFLoader();
let blinkInterval = null;
let tvButton = null;
let originalColor = null;

loader.load(
    'models/intro-F.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        console.log("Modèle chargé");

        const tvScreen = model.getObjectByName("ecranTv");
        if (tvScreen) {
            tvScreen.material = new THREE.MeshBasicMaterial({ 
                map: textureVideo, 
                side: THREE.DoubleSide,
                toneMapped: false
            });
            tvScreen.material.visible = false;
        }

        tvButton = model.getObjectByName("Text006_8");
        if (tvButton && tvButton.material) {
            originalColor = tvButton.material.color.clone();
            startBlinking(tvButton);
        }
    },
    undefined,
    (error) => {
        console.error("Erreur lors du chargement du modèle :", error);
    }
);

//clignotement du 
function startBlinking(object3D) {
    const blinkColor = new THREE.Color("#F5F5DC"); 
    let toggle = false;
    blinkInterval = setInterval(() => {
        object3D.material.color.set(toggle ? blinkColor : originalColor);
        toggle = !toggle;
    }, 500);
}

function stopBlinking() {
    if (blinkInterval !== null) {
        clearInterval(blinkInterval);
        blinkInterval = null;
        if (tvButton && originalColor) {
            tvButton.material.color.set(originalColor);
        }
    }
}

document.addEventListener("mousedown", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        console.log(`objets: ${clickedObject.name}`);

        if (clickedObject.name === "Text006_8") {
            stopBlinking();
            video.play();
            gresillement.play();
            console.log("video en cours");

            const tvScreen = scene.getObjectByName("ecranTv");
            if (tvScreen) {
                tvScreen.material.visible = true;
            }
        }
    }
});


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const gresillement = new Audio('media/tv-noise.mp3');
gresillement.loop = true;
gresillement.volume = 0.5;

document.addEventListener("mousedown", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        console.log(`objets: ${clickedObject.name}`);

        if (clickedObject.name === "Text006_8") {
                video.play();
                gresillement.play();

                

                console.log("video en cours");

                //affichage video 
                const tvScreen = scene.getObjectByName("ecranTv");
                if (tvScreen) {
                    tvScreen.material.visible = true;
                }
                
        }
    }
});

// dexième partie de l'intro l'aspiration
const videoAspiration = document.getElementById('videoAspiration');
videoAspiration.muted = true;

video.addEventListener('ended', () => {
    console.log("Première vidéo terminée, lancement de la deuxième...");
    
    //lancement de la deuxième video
    const tvScreen = scene.getObjectByName("ecranTv");
    if (tvScreen) {
        tvScreen.material.map = new THREE.VideoTexture(videoAspiration);
        tvScreen.material.needsUpdate = true;
    }

    videoAspiration.play();
    zoomOnScreen();
});

// Fonction pour zoomer sur l'écran
function zoomOnScreen() {
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const zoomSpeed = 0.02;

    function animateZoom() {
        camera.position.lerp(targetPosition, zoomSpeed);
        controls.update();
        renderer.render(scene, camera);

        if (camera.position.distanceTo(targetPosition) > 0) {
            requestAnimationFrame(animateZoom);
        }
    }

    animateZoom();
}

//redirection
videoAspiration.addEventListener('ended', () => {
    console.log("Deuxième vidéo terminée, redirection...");
    window.location.href = "lobby.html"; 
});


// // faire clignoter le btn 


///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
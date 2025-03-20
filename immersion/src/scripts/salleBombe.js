import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
 

///////////////////////////////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    textureVideo.needsUpdate = true;
    renderer.render(scene, camera);
}
animate();

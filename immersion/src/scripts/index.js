//zoom au scroll gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


gsap.registerPlugin(ScrollTrigger);


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
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
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
camera.position.set(0, -0.5, 1.5);


// Configuration du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit control
// const controls = new OrbitControls(camera, renderer.domElement);



//////////////////////////////////////////////////////////

// Chargement du modèle 3D 
const loader = new GLTFLoader();
// DRACOLoader
loader.load(
    'models/intro-F.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -0.0008, 0);
        model.rotateY(5);
        scene.add(model);
        console.log("Modèle chargé");
    }
);





const {innerHeight} = window;
const maxScale = 2;
const tvButton = document.querySelector("#play");

if (tvButton) {
    gsap.to("#zoom-in", {
        scale: maxScale,
        stagger: 0.25,
        duration: 1,
        scrollTrigger: {
            pin: true,
            end: `+=${innerHeight * 1.3}`,
            scrub: 3,

            //pour l'apparision du btn de la tv
            onUpdate: (self) => {
                if (self.progress >= 0.5) {
                    tvButton.classList.add("visible");
                    console.log("visible");
                } else {
                    tvButton.classList.remove("visible");
                    console.log("caché");
                }
            }
        }
    });
}

//--------------------------------------------------------------
//le code suivant n'est pas encore fonctionnel car j'ai mis une image à la place de ma scène 3D(certain de mes éléments n'apparaissait pas)
// // scene
// const scene = new THREE.Scene();


// const mouse = new THREE.Vector2();
// const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);

// const raycaster = new THREE.Raycaster();

// document.addEventListener('click', () => {
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children, true);
//     if (intersects.length > 0) {
//         console.log(intersects[0].object.name);
        
//         intersects[0].object.material.color.set(0xff0000);
//     }
// });
// //--------------------------------------------------------------



/////////lancement de la vidéo neige + écran blanc 
document.addEventListener("DOMContentLoaded", function () {
    const playlist = [
        {
            name: "neige.mp4",
        },
        {
            name: "video2.webm",
        }];

        console.log(playlist);

        const video = document.getElementById("video");

        //Fonction qui lance la vidéo
        const playVideo = () => {
            video.play();
        };

        const container = document.getElementById("container");

           //Évènement qui lance la vidéo si l'utilisateur clique sur play
        document.getElementById('play').addEventListener('click', function() {
        // alert("tesssstttt");
        container.style.display = "none";
        playVideo();
        addEventListener('ended',video,false);
        function video() {
            window.location.href = "lobby.html";
    }
        
    });

        // media.removeAttribute("controls");
        // controls.style.visibility = "visible";

    });

///////////////////////////////////////////////////////////////////////
// Rendu de la scène
function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
}

animate();




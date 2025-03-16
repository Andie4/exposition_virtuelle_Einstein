//zoom au scroll gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
gsap.registerPlugin(ScrollTrigger);


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
//--------------------------------------------------------------



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



//zoom au scroll gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const {innerHeight} = window;
const maxScale = 2;
const tvButton = document.querySelector("#tv-button");

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




document.querySelector("#tv-button").addEventListener("click", () => {
    alert("tesssstttt");
});



import React from "react";

import { Nav } from "../component/nav";

export function Home() {
    return (
        <>
        <Nav />
        <div>
            <h2>Bienvenue sur le back-office !</h2>
            <div>
                <p>10</p>
                <p>Réservation aujourd'hui</p>
            </div>
            <div>
                <p>5</p>
                <p>Visite en cours</p>
            </div>
            <div>
                <p>graphique 1 </p>
                <p>graphique 2 </p>
                <p>graphique 3 </p>
                <p>graphique 4 </p>
            </div>
            <a href="">Site de l'exposition</a>
            <a href="">Site de l'agence</a>
        </div>
        </>
    );
}


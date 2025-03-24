import React from "react";

import { Nav } from "../component/nav";
import { ChartHoraire } from "../component/chart/chartHoraire";
import { ChartJour } from "../component/chart/chartJour";
import { ChartPlace } from "../component/chart/chartPlace";
import { ChartTarif } from "../component/chart/chartTarif";

export function Home() {
    return (
        <>
            <Nav />
            <main>
                <h1>Bienvenue sur le back-office !</h1>
                <div className="multiColumn center">
                    <ChartHoraire />
                    <ChartJour />
                    <ChartPlace />
                    <ChartTarif />
                </div>
            </main>
        </>
    );
}


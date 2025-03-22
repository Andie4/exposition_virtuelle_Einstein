import { ChartComponent } from "./chartComponent";
import { useEffect, useState } from "react";

export function ChartPlace() {
    const [resas, setResas] = useState([]);
    const [billets, setBillets] = useState([]);
    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem("token");

    // Récupérer les réservations
    useEffect(() => {
        fetch("https://albert.xploria.fr/api/resa", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setResas(data);
            });
    }, [token]);

    // Récupérer les billets associés à chaque réservation
    useEffect(() => {
        const fetchBillets = async () => {
            const allBillets = [];
            for (let resa of resas) {
                const response = await fetch(`https://albert.xploria.fr/api/resa_billet/${resa.id_resa}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                allBillets.push({ resaId: resa.id_resa, billets: data });
            }
            setBillets(allBillets);
        };

        if (resas.length > 0) {
            fetchBillets();
        }
    }, [resas, token]);

    // Calculer le nombre de billets par réservation et regrouper par nombre de billets
    useEffect(() => {
        const billetCounts = Array(10).fill(0); // Tableau pour compter les réservations avec 1, 2, ..., 10 billets
        billets.forEach((billetGroup) => {
            const billetCount = billetGroup.billets.length;
            if (billetCount >= 1 && billetCount <= 10) {
                billetCounts[billetCount - 1] += 1; // Incrementer le compteur pour ce nombre de billets
            }
        });

        setChartData(billetCounts);
    }, [billets]);

    return (
        <div className="myChart4">
            <h2>Nombre de billets par réservation</h2>
            <div className="chart myChart4">
                <ChartComponent
                    chartId="myChart4"
                    type="bar"
                    labels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    data={chartData}
                    label="Nombre de réservations"
                />
            </div>
        </div>
    );
}

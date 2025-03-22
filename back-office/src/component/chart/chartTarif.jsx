import { ChartComponent } from "./chartComponent";
import { useEffect, useState } from "react";

export function ChartTarif() {
    // Compter le nombre de billets par tarif
    const [billets, setBillets] = useState([]);
    const [tarifs, setTarifs] = useState([]);
    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem("token");

    // Récupérer les billets
    useEffect(() => {
        fetch(`https://albert.xploria.fr/api/billet`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBillets(data);
            });
    }, [token]);

    // Récupérer les tarifs
    useEffect(() => {
        fetch("https://albert.xploria.fr/api/tarif", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTarifs(data);
            });
    }, [token]);

    // Calculer le nombre de billets par tarif
    useEffect(() => {
        const tarifCounts = {};
        
        // Initialisation de l'objet tarifCounts pour chaque tarif
        tarifs.forEach(tarif => {
            tarifCounts[tarif.id_tarif] = 0; // Initialiser chaque tarif à 0
        });

        // Compter le nombre de billets par tarif
        billets.forEach(billet => {
            const tarifId = billet.tarif_billet; // Associer le billet à un tarif via son tarif_billet
            if (tarifCounts[tarifId] !== undefined) {
                tarifCounts[tarifId] += 1;
            }
        });

        // Créer le tableau de données pour le graphique
        const dataForChart = tarifs.map(tarif => tarifCounts[tarif.id_tarif] || 0);
        
        setChartData(dataForChart);
    }, [billets, tarifs]);

    return (
        <div className="myChart3">
            <h2>Billets par tarifs</h2>
            <div className="chart myChart3">
                <ChartComponent
                    chartId="myChart3"
                    type="pie"
                    labels={tarifs.map(tarif => tarif.nom_tarif)}  // Labels des tarifs
                    data={chartData}  // Données du graphique
                    label="Nombre de billets"
                />
            </div>
        </div>
    );
}

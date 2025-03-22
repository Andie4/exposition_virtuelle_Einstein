import { ChartComponent } from "./chartComponent";
import { useEffect, useState } from "react";

export function ChartHoraire() {
    const [resas, setResas] = useState([]);
    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem("token");

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
    }, []);

    // Regrouper les réservations par tranche horaire
    useEffect(() => {
        const horaires = ['10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00'];
        const countByHour = horaires.map(hour => 
            resas.filter(resa => resa.heure_resa === hour).length
        );
        
        setChartData(countByHour);
    }, [resas]);

    return (
        <div className="myChart2">
            <h2>Réservation par tranche horaire</h2>
            <div className="chart">
                <ChartComponent
                    chartId="myChart2"
                    type="line"
                    labels={['10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h']}
                    data={chartData}
                    label="Nombre de réservations"
                />
            </div>
        </div>
    );
}

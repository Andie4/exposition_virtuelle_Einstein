import { ChartComponent } from "./chartComponent";
import { useEffect, useState } from "react";

export function ChartJour() {
    const [resas, setResas] = useState([]);
    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem("token");

    // Fonction pour récupérer le jour de la semaine à partir de la date
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        return days[date.getDay()];
    };

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

    // Compter les réservations pour chaque jour de la semaine
    useEffect(() => {
        const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const countByDay = daysOfWeek.map(day => 
            resas.filter(resa => getDayOfWeek(resa.date_resa) === day).length
        );
        
        setChartData(countByDay);
    }, [resas]);

    return (
        <div className="myChart1">
            <h2>Réservation par jour</h2>
            <div className="chart myChart1">
                <ChartComponent
                    chartId="myChart"
                    type="bar"
                    labels={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]}
                    data={chartData}
                    label="Nombre de réservations"
                />
            </div>
        </div>
    );
}

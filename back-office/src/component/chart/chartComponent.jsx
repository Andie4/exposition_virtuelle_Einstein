import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function ChartComponent({ chartId, type, labels, data, label }) {
    const chartRef = useRef(null); // Référence au canvas
    const chartInstance = useRef(null); // Référence à l'instance du graphique

    useEffect(() => {
        if (!chartRef.current) return;

        // ⚠️ Si un graphique existe déjà, on le détruit avant d'en créer un nouveau
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        borderWidth: 1,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                        ],
                    },
                ],
            },
            options: {
                scales: type === "pie" ? {} : { y: { beginAtZero: true } },
            },
        });

        // 🧹 Nettoyage du graphique lorsqu'on démonte le composant
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [type, labels, data, label]); // Recrée le graphique seulement si les données changent

    return <canvas ref={chartRef} id={chartId} width="400" height="400"></canvas>;
}

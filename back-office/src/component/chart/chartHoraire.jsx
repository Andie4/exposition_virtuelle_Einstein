import { ChartComponent } from "./chartComponent";

export function ChartHoraire() {
    return (
        <div className="myChart2">
            <h2>Réservation par tranche horaire</h2>
            <div className="chart ">
                <ChartComponent
                    chartId="myChart2"
                    type="line"
                    labels={[10, 11, 12, 13, 14, 15, 16, 17, 18]}
                    data={[12, 19, 5, 20, 10, 30, 12, 19, 5, 20]}
                    label="Nombre de visiteurs"
                />
            </div>
        </div>
    );
}
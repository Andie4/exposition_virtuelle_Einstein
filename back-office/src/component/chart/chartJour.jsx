import { ChartComponent } from "./chartComponent";


export function ChartJour() {
    return (
        <div className="myChart1">
            <h2>Réservation par jour</h2>
            <div className="chart myChart1">
                <ChartComponent
                    chartId="myChart"
                    type="bar"
                    labels={["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]}
                    data={[12, 19, 5, 20, 10, 30, 12]}
                    label="Nombre de visiteurs"
                />
            </div>
        </div>
    );
}
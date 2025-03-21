import { ChartComponent } from "./chartComponent";

export function ChartPlace() {
    return (
        <div className="myChart4">
            <h2>Nombre de place par réservations</h2>
            <div className="chart myChart4">
                <ChartComponent
                    chartId="myChart4"
                    type="bar"
                    labels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    data={[12, 19, 30, 12, 19, 5, 20, 10, 30, 12]}
                    label="Nombre de places par réservation"
                />
            </div>
        </div>
    );
}
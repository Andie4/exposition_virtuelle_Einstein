import { ChartComponent } from "./chartComponent";

export function ChartTarif() {
    return (
        <div className="myChart3">
            <h2>Billets par tarifs</h2>
            <div className="chart myChart3">
                <ChartComponent
                    chartId="myChart3"
                    type="pie"
                    labels={["Plein tarif", "Enfant -16 ans", "Jeune -26 ans", "Sénior +65 ans"]}
                    data={[12, 19, 30, 12]}
                    label="Nombre de visiteurs"
                />
            </div>
        </div>
    );
}
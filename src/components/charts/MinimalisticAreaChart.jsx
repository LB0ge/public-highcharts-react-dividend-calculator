import { Series, PlotOptions } from '@highcharts/react';
import MinimalisticChart from './MinimalisticChart';

export default function MinimalisticAreaChart({ height, width }) {
    return (
        <MinimalisticChart
            options={{
                chart: {
                    height,
                    width
                }
            }}
        >
            <PlotOptions series={{}} />
            <Series type="areaspline" data={[200, 135, 255, 355, 90]} />
            <Series type="areaspline" data={[210, 245, 230, 340, 110]} />
        </MinimalisticChart>
    );
}

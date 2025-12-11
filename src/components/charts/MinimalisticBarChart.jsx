import { PlotOptions, Legend } from '@highcharts/react';
import { BarSeries } from '@highcharts/react/series/Bar';
import MinimalisticChart from './MinimalisticChart';

export default function MinimalisticBarChart({ children }) {
    return (
        <MinimalisticChart>
            <Legend
                // reversed={true}
                symbolHeight={15}
                symbolWidth={15}
                symbolRadius={4}
            />
            {children}
        </MinimalisticChart>
    );
}

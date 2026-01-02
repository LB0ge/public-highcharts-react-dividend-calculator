import { Chart } from '@highcharts/react';

export default function ChartComponent({ children, ...rest }) {
    return (
        <Chart
            options={{
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }}
            // ensure the chart container fills its parent element
            containerProps={{ style: { width: '100%', height: '100%' } }}
            {...rest}
        >
            {children}
        </Chart>
    );
}

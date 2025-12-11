import React from 'react';
import { Chart, XAxis, YAxis, Credits } from '@highcharts/react';

type MinimalisticChartProps = React.ComponentProps<typeof Chart>;

export default function MinimalisticChart({
    children,
    ...rest
}: MinimalisticChartProps) {
    return (
        <Chart {...rest}>
            <Credits enabled={false} />
            {/* <XAxis visible={false} /> */}
            <YAxis visible={false} />
            {children}
        </Chart>
    );
}

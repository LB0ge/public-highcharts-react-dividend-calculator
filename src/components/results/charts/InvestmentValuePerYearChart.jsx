import { useTheme } from '@emotion/react';
import {
    Chart,
    Title,
    XAxis,
    Tooltip,
    YAxis,
    PlotOptions
} from '@highcharts/react';
import { SplineSeries } from '@highcharts/react/series/Spline';
import { AreaSplineSeries } from '@highcharts/react/series/AreaSpline';

export default function InvestmentValuePerYearChart({
    view,
    results,
    showComposition
}) {
    const theme = useTheme();

    const { totalReinvestmentValue, totalValueNoReinvestment, principal } =
        view;

    return (
        <Chart
            containerProps={{
                style: {
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }}
        >
            <Title>Investment Value Over Time</Title>
            <XAxis
                tickInterval={1}
                title={{ text: 'Year' }}
                min={0}
                max={totalReinvestmentValue.length - 0.5}
            />
            <YAxis min={0} />
            <Tooltip
                shared={true}
                headerFormat="Estimated total value in year <strong>{point.x}</strong>:<br>"
            />
            <PlotOptions
                series={{
                    marker: {
                        enabled: false
                    }
                }}
            />
            <SplineSeries
                key="reinvest-total"
                data={totalReinvestmentValue}
                options={{
                    id: 'reinvest-total',
                    name: 'Scenario A',
                    color: theme.palette.success.main,
                    visible: !showComposition,
                    showInLegend: !showComposition,
                    zIndex: 2
                }}
            />
            <SplineSeries
                key="bank-total"
                data={totalValueNoReinvestment}
                options={{
                    id: 'bank-total',
                    name: 'Scenario B',
                    color: theme.palette.secondary.main,
                    zIndex: 3
                }}
            />
            <AreaSplineSeries
                key="growth"
                data={results.reinvest.map(
                    (p) => p.totalValue - p.cumulativeDividendsNet - principal
                )}
                options={{
                    id: 'growth',
                    name: 'Growth (A)',
                    color: theme.palette.success.light,
                    stack: 'reinvest',
                    stacking: 'normal',
                    visible: showComposition,
                    showInLegend: showComposition
                }}
            />
            <AreaSplineSeries
                key="reinvestDividends"
                data={results.reinvest.map((p) => p.cumulativeDividendsNet)}
                options={{
                    id: 'reinvestDividends',
                    name: 'Cumulative Dividends (A)',
                    color: theme.palette.success.main,
                    stack: 'reinvest',
                    stacking: 'normal',
                    visible: showComposition,
                    showInLegend: showComposition
                }}
            />
            <AreaSplineSeries
                key="principal"
                data={results.reinvest.map(() => principal)}
                options={{
                    id: 'principal',
                    name: 'Principal',
                    color: theme.palette.success.dark,
                    stack: 'reinvest',
                    stacking: 'normal',
                    visible: showComposition,
                    showInLegend: showComposition
                }}
            />
        </Chart>
    );
}

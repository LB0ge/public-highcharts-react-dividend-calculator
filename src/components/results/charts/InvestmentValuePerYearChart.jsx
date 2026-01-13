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
// import { AreaSplineRangeSeries } from '@highcharts/react/series/AreaSplineRange';

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
                id="reinvest-total"
                data={totalReinvestmentValue}
                name="Scenario A"
                color={theme.palette.success.main}
                visible={!showComposition}
                showInLegend={!showComposition}
                zIndex={2}
            />
            {/**
             * Lower/Upper range temporarily disabled; show only expected scenario for now.
             * <AreaSplineRangeSeries
             *     key="reinvest-range"
             *     id="reinvest-range"
             *     data={totalReinvestmentValueLowerUpper}
             *     name="Reinvest Scenario Range"
             *     color={theme.palette.success.light}
             *     zIndex={0}
             *     dashStyle="Dash"
             *     visible={showLowerUpper}
             *     showInLegend={showLowerUpper}
             * />
             */}
            <SplineSeries
                key="bank-total"
                id="bank-total"
                data={totalValueNoReinvestment}
                name="Scenario B"
                color={theme.palette.secondary.main}
                zIndex={3}
            />
            <AreaSplineSeries
                key="growth"
                id="growth"
                data={results.reinvest.map(
                    (p) => p.totalValue - p.cumulativeDividendsNet - principal
                )}
                name="Growth (A)"
                color={theme.palette.success.light}
                stack="reinvest"
                stacking="normal"
                visible={showComposition}
                showInLegend={showComposition}
            />
            <AreaSplineSeries
                key="reinvestDividends"
                id="reinvestDividends"
                data={results.reinvest.map((p) => p.cumulativeDividendsNet)}
                name="Cumulative Dividends (A)"
                color={theme.palette.success.main}
                stack="reinvest"
                stacking="normal"
                visible={showComposition}
                showInLegend={showComposition}
            />
            <AreaSplineSeries
                key="principal"
                id="principal"
                data={results.reinvest.map(() => principal)}
                name="Principal"
                color={theme.palette.success.dark}
                stack="reinvest"
                stacking="normal"
                visible={showComposition}
                showInLegend={showComposition}
            />
        </Chart>
    );
}

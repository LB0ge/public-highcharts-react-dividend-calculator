import { useTheme } from '@emotion/react';
import { Title, XAxis, Tooltip } from '@highcharts/react';
import { SplineSeries } from '@highcharts/react/series/Spline';
import { AreaSplineSeries } from '@highcharts/react/series/AreaSpline';
// import { AreaSplineRangeSeries } from '@highcharts/react/series/AreaSplineRange';
import ChartComponent from './ChartComponent';

export default function InvestmentValuePerYearChart({
    view,
    results,
    showComposition
}) {
    const theme = useTheme();

    const {
        totalReinvestmentValue,
        totalValueNoReinvestment,
        // totalReinvestmentValueLowerUpper,
        principal
    } = view;

    return (
        <ChartComponent>
            <Title>Investment Value Over Time</Title>
            <XAxis tickInterval={1} title={{ text: 'Year' }} />
            <Tooltip
                shared={true}
                headerFormat="Estimated total value in year <strong>{point.x}</strong>:<br>"
            />
            <SplineSeries
                key="reinvest-total"
                id="reinvest-total"
                data={totalReinvestmentValue}
                name="Reinvest Scenario"
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
                name="Bank Scenario"
                color={theme.palette.primary.main}
                dashStyle="LongDash"
                zIndex={3}
            />
            <AreaSplineSeries
                key="growth"
                id="growth"
                data={results.reinvest.map(
                    (p) => p.totalValue - p.cumulativeDividendsNet - principal
                )}
                name="Growth (reinvest)"
                color={theme.palette.success.main}
                stack="reinvest"
                stacking="normal"
                visible={showComposition}
                showInLegend={showComposition}
            />
            <AreaSplineSeries
                key="reinvestDividends"
                id="reinvestDividends"
                data={results.reinvest.map((p) => p.cumulativeDividendsNet)}
                name="Cumulative Dividends (reinvest)"
                color={theme.palette.secondary.main}
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
                color={theme.palette.primary.light}
                stack="reinvest"
                stacking="normal"
                visible={showComposition}
                showInLegend={showComposition}
            />
        </ChartComponent>
    );
}

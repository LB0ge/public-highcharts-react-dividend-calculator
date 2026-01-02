import { useCalculator } from '../../context/useCalculator';
import { useState } from 'react';
import { Box, useTheme, Switch, FormControlLabel } from '@mui/material';

import { Title, XAxis, Tooltip, Legend, PlotOptions } from '@highcharts/react';
import { AreaSplineRangeSeries } from '@highcharts/react/series/AreaSplineRange';
import { SplineSeries } from '@highcharts/react/series/Spline';
import { BarSeries } from '@highcharts/react/series/Bar';
import { AreaSplineSeries } from '@highcharts/react/series/AreaSpline';
import MinimalisticChart from '../charts/MinimalisticChart';
import Chart from '../charts/Chart';
import KpiCards from './KpiCards';

export default function ResultsPanelContents() {
    const theme = useTheme();
    const { results, view } = useCalculator();
    const [showComposition, setShowComposition] = useState(false);
    const [showLowerUpper, setShowLowerUpper] = useState(true);

    const {
        totalReinvestmentValueExpected,
        totalValueNoReinvestmentExpected,
        totalReinvestmentValueLowerUpper,
        finalReinvestmentValue,
        finalBankValue,
        principal,
        reinvestDividends,
        reinvestGrowth,
        bankDividends,
        bankGrowth
    } = view;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(3),
                width: '100%',
                height: '100%',
                overflow: 'visible'
                // p: 0
            }}
        >
            <KpiCards
                finalReinvestmentValue={finalReinvestmentValue}
                finalBankValue={finalBankValue}
            />

            {/* Composition chart: minimalistic stacked bar */}
            <Box
                sx={{
                    display: 'flex',
                    gap: theme.spacing(2),
                    justifyContent: 'left',
                    width: '100%',
                    maxWidth: 960,
                    mx: 'auto',
                    overflowX: 'hidden'
                }}
            >
                <MinimalisticChart
                    options={{
                        chart: {
                            height: 150
                        }
                    }}
                >
                    <Legend
                        reversed={true}
                        symbolHeight={15}
                        symbolWidth={15}
                        symbolRadius={4}
                    />
                    <Tooltip shared={true} />
                    <XAxis
                        categories={[
                            'Reinvest dividends',
                            'Put dividends in the bank'
                        ]}
                        lineWidth={0}
                    />
                    <PlotOptions
                        series={{
                            stacking: 'normal',
                            borderRadius: {
                                radius: '50%',
                                scope: 'stack',
                                where: 'all'
                            }
                        }}
                    />
                    <BarSeries
                        data={[
                            Math.max(0, reinvestGrowth),
                            Math.max(0, bankGrowth)
                        ]}
                        name="Growth"
                        color={theme.palette.success.main}
                    />
                    <BarSeries
                        data={[
                            Math.max(0, reinvestDividends),
                            Math.max(0, bankDividends)
                        ]}
                        name="Dividends"
                        color={theme.palette.secondary.main}
                    />
                    <BarSeries
                        data={[Math.max(0, principal), Math.max(0, principal)]}
                        name="Principal"
                        color={theme.palette.primary.light}
                    />
                </MinimalisticChart>
            </Box>

            {/* Main chart with toggle */}
            <Box
                sx={{
                    flex: 1,
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        top: theme.spacing(-1),
                        right: theme.spacing(0),
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        px: 1,
                        py: 0.25
                    }}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={showComposition}
                                onChange={(e) =>
                                    setShowComposition(e.target.checked)
                                }
                            />
                        }
                        label="Show composition"
                        sx={{
                            m: 0,
                            '& .MuiFormControlLabel-label': { fontSize: 12 }
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={showLowerUpper}
                                onChange={(e) =>
                                    setShowLowerUpper(e.target.checked)
                                }
                            />
                        }
                        label="Show lower/upper estimates"
                        sx={{
                            m: 0,
                            '& .MuiFormControlLabel-label': { fontSize: 12 }
                        }}
                    />
                </Box>

                <Chart>
                    <Title>Investment Value Over Time</Title>
                    <XAxis
                        tickInterval={1}
                        lineColor={theme.palette.divider}
                        title={{ text: 'Year' }}
                    />
                    <Tooltip
                        shared={true}
                        headerFormat="Estimated total value after <strong>{point.x}</strong> years:<br>"
                    />
                    <SplineSeries
                        key="reinvest-total"
                        id="reinvest-total"
                        data={totalReinvestmentValueExpected}
                        name="Reinvest Scenario"
                        color={theme.palette.success.main}
                        visible={!showComposition}
                        showInLegend={!showComposition}
                        zIndex={2}
                    />
                    <AreaSplineRangeSeries
                        key="reinvest-range"
                        id="reinvest-range"
                        data={totalReinvestmentValueLowerUpper}
                        name="Reinvest Scenario Range"
                        color={theme.palette.success.light}
                        zIndex={0}
                        dashStyle="Dash"
                        visible={showLowerUpper}
                        showInLegend={showLowerUpper}
                    />
                    <SplineSeries
                        key="bank-total"
                        id="bank-total"
                        data={totalValueNoReinvestmentExpected}
                        name="Bank Scenario"
                        color={theme.palette.primary.main}
                        dashStyle="LongDash"
                        zIndex={3}
                    />
                    <AreaSplineSeries
                        key="growth"
                        id="growth"
                        data={results.reinvest.expected.map(
                            (p) =>
                                p.totalValue -
                                p.cumulativeDividendsNet -
                                principal
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
                        data={results.reinvest.expected.map(
                            (p) => p.cumulativeDividendsNet
                        )}
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
                        data={results.reinvest.expected.map(() => principal)}
                        name="Principal"
                        color={theme.palette.primary.light}
                        stack="reinvest"
                        stacking="normal"
                        visible={showComposition}
                        showInLegend={showComposition}
                    />
                </Chart>
            </Box>
        </Box>
    );
}

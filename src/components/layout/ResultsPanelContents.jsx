import { useCalculator } from '../../context/useCalculator';
import { useState } from 'react';
import { Box, useTheme, Switch, FormControlLabel } from '@mui/material';

import { Title, XAxis, Tooltip, Legend, PlotOptions } from '@highcharts/react';
import { AreaSplineRangeSeries } from '@highcharts/react/series/AreaSplineRange';
import { SplineSeries } from '@highcharts/react/series/Spline';
import { BarSeries } from '@highcharts/react/series/Bar';
import MinimalisticChart from '../charts/MinimalisticChart';
import Chart from '../charts/Chart';
import KpiCard from './KpiCard';
import { formatCurrency } from '../../utils/currency';

export default function ResultsPanelContents() {
    const theme = useTheme();
    const { results, view } = useCalculator();
    const [showComposition, setShowComposition] = useState(false);

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
            {/* KPI Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr'
                    },
                    gap: theme.spacing(2),
                    maxWidth: 960,
                    mx: 'auto',
                    width: '100%'
                }}
            >
                <KpiCard
                    title="Reinvestment Scenario"
                    value={formatCurrency(finalReinvestmentValue)}
                    color="success"
                    valueGradientTo="secondary"
                />
                <KpiCard
                    title="Bank Scenario"
                    value={formatCurrency(finalBankValue)}
                    color="primary"
                    valueGradientTo="secondary"
                />
                <KpiCard
                    title="Extra from reinvestment"
                    value={formatCurrency(
                        (results.finalSummary &&
                            results.finalSummary.extraFromReinvestExpected) ||
                            0
                    )}
                    color="secondary"
                    valueGradientTo="primary"
                />
            </Box>

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
                        color={theme.palette.primary.main}
                    />
                </MinimalisticChart>
            </Box>

            {/* Main chart with toggle */}
            <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: theme.spacing(-1),
                        // left: theme.spacing(0),
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
                </Box>

                <Chart>
                    <Title>Investment Value Over Time</Title>
                    <XAxis
                        tickInterval={1}
                        lineColor={theme.palette.divider}
                        title={{ text: 'Year' }}
                    />
                    <SplineSeries
                        data={totalReinvestmentValueExpected}
                        name="Reinvest"
                        color={theme.palette.success.main}
                    />
                    <AreaSplineRangeSeries
                        data={totalReinvestmentValueLowerUpper}
                        name="Reinvest Range"
                        color={theme.palette.success.main}
                        fillOpacity={0.15}
                        zIndex={0}
                    />
                    <SplineSeries
                        data={totalValueNoReinvestmentExpected}
                        name="Bank"
                        color={theme.palette.primary.main}
                        dashStyle="LongDash"
                    />
                </Chart>
            </Box>
        </Box>
    );
}

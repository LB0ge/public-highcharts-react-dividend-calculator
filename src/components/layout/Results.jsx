import { useCalculator } from '../../context/useCalculator';
import {
    Box,
    Divider,
    Card,
    CardContent,
    Typography,
    useTheme
} from '@mui/material';

import { Title, XAxis, Tooltip, Legend, PlotOptions } from '@highcharts/react';
import { AreaSplineRangeSeries } from '@highcharts/react/series/AreaSplineRange';
import { SplineSeries } from '@highcharts/react/series/Spline';
import { BarSeries } from '@highcharts/react/series/Bar';
import MinimalisticChart from '../charts/MinimalisticChart';
import Chart from '../charts/Chart';
import { formatCurrency } from '../../utils/currency';

export default function Results() {
    const theme = useTheme();
    const { results } = useCalculator();
    console.log('Results component render', results);

    const totalReinvestmentValueExpected = results.reinvest.expected.map(
        (point) => point.totalValue
    );
    const totalValueNoReinvestmentExpected = results.bank.expected.map(
        (point) => point.totalValue
    );

    const totalReinvestmentValueLower = results.reinvest.lower.map(
        (point) => point.totalValue
    );
    const totalReinvestmentValueUpper = results.reinvest.upper.map(
        (point) => point.totalValue
    );

    const totalReinvestmentValueLowerUpper = totalReinvestmentValueLower.map(
        (lowerValue, index) => [lowerValue, totalReinvestmentValueUpper[index]]
    );

    const finalReinvestmentValue =
        totalReinvestmentValueExpected[
            totalReinvestmentValueExpected.length - 1
        ];
    const finalBankValue =
        totalValueNoReinvestmentExpected[
            totalValueNoReinvestmentExpected.length - 1
        ];

    // composition components
    // read precomputed composition from results.finalSummary
    const comp = results.finalSummary || {};
    const reinvestComp = (comp.reinvestComposition &&
        comp.reinvestComposition.expected) || {
        initial: 0,
        dividends: 0,
        growth: 0
    };
    const bankComp = (comp.bankComposition &&
        comp.bankComposition.expected) || {
        initial: 0,
        dividends: 0,
        growth: 0
    };

    const principal = reinvestComp.initial || 0;
    const reinvestDividends = reinvestComp.dividends || 0;
    const reinvestGrowth = reinvestComp.growth || 0;

    const bankDividends = bankComp.dividends || 0;
    const bankGrowth = bankComp.growth || 0;

    // data is yearly now; one tick per year
    const periodsPerYear = 1;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(3),
                width: '100%',
                height: '100%',
                overflow: 'hidden'
                // p: 0
            }}
        >
            <Divider sx={{ mb: 0 }} />
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
                <Card
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.success.light}08 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px rgba(31, 41, 55, 0.15)`
                        }
                    }}
                >
                    <CardContent>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                        >
                            Reinvestment Scenario
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700
                            }}
                        >
                            {formatCurrency(finalReinvestmentValue)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}08 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px rgba(31, 41, 55, 0.15)`
                        }
                    }}
                >
                    <CardContent>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                        >
                            Bank Scenario
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700
                            }}
                        >
                            {formatCurrency(finalBankValue)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.light}08 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px rgba(31, 41, 55, 0.15)`
                        }
                    }}
                >
                    <CardContent>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                        >
                            Extra from reinvestment
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700
                            }}
                        >
                            {formatCurrency(
                                (results.finalSummary &&
                                    results.finalSummary
                                        .extraFromReinvestExpected) ||
                                    0
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Composition chart: minimalistic stacked bar */}
            <Box
                sx={{
                    display: 'flex',
                    gap: theme.spacing(2),
                    justifyContent: 'center',
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

            {/* Main spline chart */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Chart>
                    <Title>Investment Value Over Time</Title>
                    <XAxis
                        tickInterval={periodsPerYear}
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

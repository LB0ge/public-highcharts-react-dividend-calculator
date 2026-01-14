import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Chart,
    Title,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    PlotOptions
} from '@highcharts/react';
import { BarSeries } from '@highcharts/react/series/Bar';

export default function FinalCompositionChart({ view }) {
    const theme = useTheme();
    const {
        principal,
        reinvestDividends,
        reinvestGrowth,
        bankDividends,
        bankGrowth
    } = view;

    return (
        <Box sx={{ width: '100%' }}>
            <Chart containerProps={{ style: { height: 200 } }}>
                <Title>Final Composition</Title>
                <YAxis visible={false} />
                <Legend
                    reversed={true}
                    symbolHeight={12}
                    symbolWidth={12}
                    symbolRadius={4}
                />
                <Tooltip shared={true} />
                <XAxis
                    categories={['A', 'B']}
                    lineWidth={0}
                    labels={{ style: { fontWeight: 600 } }}
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
                        {
                            y: Math.max(0, reinvestGrowth),
                            borderColor: theme.palette.success.dark
                        },
                        {
                            y: Math.max(0, bankGrowth),
                            borderColor: theme.palette.secondary.dark
                        }
                    ]}
                    name="Growth"
                    color={theme.palette.primary.light}
                />
                <BarSeries
                    data={[
                        {
                            y: Math.max(0, reinvestDividends),
                            borderColor: theme.palette.success.dark
                        },
                        {
                            y: Math.max(0, bankDividends),
                            borderColor: theme.palette.secondary.dark
                        }
                    ]}
                    name="Dividends"
                    color={theme.palette.primary.main}
                />
                <BarSeries
                    data={[
                        {
                            y: Math.max(0, principal),
                            borderColor: theme.palette.success.dark
                        },
                        {
                            y: Math.max(0, principal),
                            borderColor: theme.palette.secondary.dark
                        }
                    ]}
                    name="Principal"
                    color={theme.palette.primary.dark}
                />
            </Chart>
        </Box>
    );
}

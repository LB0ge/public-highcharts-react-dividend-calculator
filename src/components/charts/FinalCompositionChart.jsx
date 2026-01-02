import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Credits,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    PlotOptions
} from '@highcharts/react';
import { BarSeries } from '@highcharts/react/series/Bar';
import ChartComponent from './ChartComponent';

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
        <Box
            sx={{
                width: '100%',
                maxWidth: 640
            }}
        >
            <ChartComponent
                options={{
                    chart: {
                        height: 150
                    }
                }}
            >
                <Credits enabled={false} />
                <YAxis visible={false} />
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
            </ChartComponent>
        </Box>
    );
}

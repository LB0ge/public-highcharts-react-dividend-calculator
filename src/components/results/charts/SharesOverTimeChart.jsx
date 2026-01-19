import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart, Title, XAxis, YAxis, Tooltip } from '@highcharts/react';
import { LineSeries } from '@highcharts/react/series/Line';

export default function SharesOverTimeChart({ results }) {
    const theme = useTheme();

    // Extract shares over time from reinvest scenario
    const sharesData = (results.reinvest || []).map((point) => point.shares);

    // Calculate doubling points
    const initialShares = sharesData[0] || 0;
    const plotLines = [];

    if (initialShares > 0) {
        let currentMultiple = 2;
        let lastYearAdded = -1;

        for (let year = 0; year < sharesData.length; year++) {
            const targetShares = initialShares * currentMultiple;

            if (sharesData[year] >= targetShares && year !== lastYearAdded) {
                plotLines.push({
                    value: year,
                    color: theme.palette.success.light,
                    width: 1,
                    dashStyle: 'Dash',
                    label: {
                        text: `${currentMultiple}x`,
                        style: {
                            color: theme.palette.text.secondary,
                            fontSize: '10px'
                        },
                        align: 'center',
                        y: 15
                    }
                });
                lastYearAdded = year;
                currentMultiple *= 2;
            }
        }
    }

    return (
        <Box
            sx={{
                width: '100%'
            }}
        >
            <Chart
                options={{
                    chart: {
                        marginBottom: 85
                        // spacingBottom: 0
                    }
                }}
                containerProps={{ style: { height: 200 } }}
            >
                <Title>Shares Over Time (A)</Title>
                <XAxis
                    lineWidth={0}
                    tickWidth={0}
                    title={{ text: 'Year', margin: 0 }}
                    max={sharesData.length - 0.5}
                    plotLines={plotLines}
                />
                <YAxis min={0} />
                <Tooltip
                    shared={true}
                    valuePrefix=""
                    headerFormat="Year <strong>{point.x}</strong>:<br/>"
                />
                <LineSeries
                    data={sharesData}
                    options={{
                        name: 'Shares',
                        color: theme.palette.success.main,
                        marker: { enabled: false },
                        step: 'left'
                    }}
                />
            </Chart>
        </Box>
    );
}

import { useTheme } from '@mui/material/styles';
import { Chart, Title, XAxis, Tooltip, Legend } from '@highcharts/react';
import { ColumnSeries } from '@highcharts/react/series/Column';

export default function DividendPayoutPerYearChart({ view, dividendMode }) {
    const theme = useTheme();

    const {
        dividendsPerYearReinvest,
        dividendsPerYearBank,
        dividendsPerYearReinvestGross,
        dividendsPerYearBankGross
    } = view;

    const mode = dividendMode === 'gross' ? 'gross' : 'net';

    const reinvestData = (
        mode === 'gross'
            ? dividendsPerYearReinvestGross
            : dividendsPerYearReinvest
    ).slice();
    const bankData = (
        mode === 'gross' ? dividendsPerYearBankGross : dividendsPerYearBank
    ).slice();

    const modeLabel = mode === 'gross' ? 'Gross' : 'Net';
    const tooltipHeader = `${modeLabel} dividends in year <strong>{point.x}</strong>:`;

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
            <Title>{`Dividends Per Year (${modeLabel})`}</Title>
            <XAxis
                tickInterval={1}
                title={{ text: 'Year' }}
                min={0}
                max={reinvestData.length - 0.5}
                endOnTick={false}
            />
            <Tooltip
                shared={true}
                valuePrefix={'$'}
                valueDecimals={0}
                headerFormat={tooltipHeader + '<br/>'}
            />
            <ColumnSeries
                name="Scenario A"
                data={reinvestData}
                color={theme.palette.success.main}
                pointPlacement="on"
            />
            <ColumnSeries
                name="Scenario B"
                data={bankData}
                color={theme.palette.secondary.main}
                pointPlacement="on"
            />
        </Chart>
    );
}

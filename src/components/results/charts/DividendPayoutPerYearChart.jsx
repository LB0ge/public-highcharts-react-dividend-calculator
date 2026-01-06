import { useTheme } from '@mui/material/styles';
import { Title, XAxis, Tooltip, Legend } from '@highcharts/react';
import { ColumnSeries } from '@highcharts/react/series/Column';
import ChartComponent from './ChartComponent';

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
        mode === 'gross' ? dividendsPerYearReinvestGross : dividendsPerYearReinvest
    ).slice();
    const bankData = (
        mode === 'gross' ? dividendsPerYearBankGross : dividendsPerYearBank
    ).slice();

    const modeLabel = mode === 'gross' ? 'Gross' : 'Net';
    const tooltipHeader = `${modeLabel} dividends in year <strong>{point.x}</strong>:`;

    return (
        <ChartComponent
            options={{
                chart: { height: 280 }
            }}
        >
            <Title>{`Dividend Payout Per Year (${modeLabel})`}</Title>
            <Legend enabled={true} />
            <XAxis tickInterval={1} title={{ text: 'Year' }} />
            <Tooltip
                shared={true}
                valuePrefix={'$'}
                valueDecimals={0}
                headerFormat={tooltipHeader + '<br/>'}
            />
            <ColumnSeries
                name="Reinvest scenario"
                data={reinvestData}
                color={theme.palette.success.main}
            />
            <ColumnSeries
                name="Bank scenario"
                data={bankData}
                color={theme.palette.primary.main}
            />
        </ChartComponent>
    );
}

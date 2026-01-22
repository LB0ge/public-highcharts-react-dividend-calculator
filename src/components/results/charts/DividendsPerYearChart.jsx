import { useTheme } from '@mui/material/styles';
import { Chart, Title, XAxis, Tooltip } from '@highcharts/react';
import { ColumnSeries } from '@highcharts/react/series/Column';

export default function DividendPayoutPerYearChart({ view, dividendMode }) {
    const theme = useTheme();

    // Clone arrays to prevent Highcharts from mutating the view model data.
    // Highcharts mutates input arrays internally during processing, which would
    // corrupt the memoized view model when the same array references are reused.
    const reinvestData = [
        ...(dividendMode === 'gross'
            ? view.dividendsPerYearReinvestGross
            : view.dividendsPerYearReinvest)
    ];
    const bankData = [
        ...(dividendMode === 'gross'
            ? view.dividendsPerYearBankGross
            : view.dividendsPerYearBank)
    ];

    // Before fix: direct references (causes mutation without cloning):
    // const reinvestData =
    //     dividendMode === 'gross'
    //         ? view.dividendsPerYearReinvestGross
    //         : view.dividendsPerYearReinvest;
    // const bankData =
    //     dividendMode === 'gross'
    //         ? view.dividendsPerYearBankGross
    //         : view.dividendsPerYearBank;

    const modeLabel = dividendMode === 'gross' ? 'Gross' : 'Net';
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
                key={`dividends-reinvest-${dividendMode}`}
                data={reinvestData}
                options={{
                    id: 'dividends-reinvest',
                    name: 'Scenario A',
                    color: theme.palette.success.main,
                    pointPlacement: 'on'
                }}
            />
            <ColumnSeries
                key={`dividends-bank-${dividendMode}`}
                data={bankData}
                options={{
                    id: 'dividends-bank',
                    name: 'Scenario B',
                    color: theme.palette.secondary.main,
                    pointPlacement: 'on'
                }}
            />
        </Chart>
    );
}

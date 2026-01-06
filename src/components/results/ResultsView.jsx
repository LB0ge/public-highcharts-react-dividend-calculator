import { useCalculator } from '../../context/useCalculator';
import { useState } from 'react';
import { Box, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material';

import KpiCards from './KpiCards';
import FinalCompositionChart from './charts/FinalCompositionChart';
import InvestmentValuePerYearChart from './charts/InvestmentValuePerYearChart';
import ChartToggles from './ChartToggles';
import DividendPayoutPerYearChart from './charts/DividendPayoutPerYearChart';

export default function ResultsView() {
    const theme = useTheme();
    const { view, results } = useCalculator();
    const [showComposition, setShowComposition] = useState(false);
    // const [showLowerUpper, setShowLowerUpper] = useState(true);
    const [dividendMode, setDividendMode] = useState('net');

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
            <KpiCards view={view} />
            <FinalCompositionChart view={view} />

            <Box
                sx={{
                    flex: 1,
                    position: 'relative'
                }}
            >
                <ChartToggles
                    showComposition={showComposition}
                    setShowComposition={setShowComposition}
                />

                <InvestmentValuePerYearChart
                    view={view}
                    results={results}
                    showComposition={showComposition}
                />
            </Box>

            <Box sx={{ mt: theme.spacing(1), position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        top: theme.spacing(-1),
                        right: theme.spacing(0),
                        zIndex: 1,
                        px: 0,
                        py: 0
                    }}
                >
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={dividendMode}
                        onChange={(_, val) => {
                            if (val !== null) setDividendMode(val);
                        }}
                        sx={{
                            '& .MuiToggleButton-root': {
                                fontSize: 12,
                                py: 0.25,
                                px: 1
                            }
                        }}
                    >
                        <ToggleButton value="net">Net</ToggleButton>
                        <ToggleButton value="gross">Gross</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <DividendPayoutPerYearChart
                    view={view}
                    dividendMode={dividendMode}
                />
            </Box>
        </Box>
    );
}

import { useCalculator } from '../../context/useCalculator';
import { useState } from 'react';
import {
    Box,
    useTheme,
    ToggleButtonGroup,
    ToggleButton,
    useMediaQuery
} from '@mui/material';

import KpiCards from './SummaryCard';
import FinalCompositionChart from './charts/FinalCompositionChart';
import SharesOverTimeChart from './charts/SharesOverTimeChart';
import InvestmentValuePerYearChart from './charts/InvestmentValuePerYearChart';
import DividendsPerYearChart from './charts/DividendsPerYearChart';
import ChartToggles from './ChartToggles';

export default function ResultsView({ isFullscreen = false }) {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const { view, results, inputs } = useCalculator();
    const [showComposition, setShowComposition] = useState(false);
    // const [showLowerUpper, setShowLowerUpper] = useState(true);
    const [dividendMode, setDividendMode] = useState('net');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(isFullscreen ? 2 : 3),
                width: '100%',
                height: '100%',
                overflow: isFullscreen ? 'hidden' : 'visible'
            }}
        >
            {/* Description and Composition chart side by side */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: theme.spacing(2)
                }}
            >
                <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 65%' } }}>
                    <KpiCards view={view} inputs={inputs} />
                </Box>
                <Box
                    sx={{
                        flex: { xs: '0 0 auto', md: '0 0 35%' },
                        minHeight: { xs: 200, md: 0 },
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                            md: 'column'
                        },
                        gap: theme.spacing(2),
                        minWidth: 0,
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            minWidth: 0,
                            width: '100%'
                        }}
                    >
                        <FinalCompositionChart
                            key={`composition-${isFullscreen}-${isMdUp}`}
                            view={view}
                        />
                    </Box>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            minWidth: 0,
                            width: '100%'
                        }}
                    >
                        <SharesOverTimeChart results={results} />
                    </Box>
                </Box>
            </Box>

            {/* Investment value chart */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 400,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'visible'
                }}
            >
                <Box sx={{ position: 'relative', mb: 1 }}>
                    <ChartToggles
                        showComposition={showComposition}
                        setShowComposition={setShowComposition}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        position: 'relative',
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <InvestmentValuePerYearChart
                        view={view}
                        results={results}
                        showComposition={showComposition}
                    />
                </Box>
            </Box>

            {/* Dividend chart */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 200,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'visible'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mb: 1,
                        zIndex: 10
                    }}
                >
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={dividendMode}
                        onChange={(_, val) => {
                            if (val !== null) setDividendMode(val);
                        }}
                    >
                        <ToggleButton value="net">Net</ToggleButton>
                        <ToggleButton value="gross">Gross</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <DividendsPerYearChart
                        view={view}
                        dividendMode={dividendMode}
                    />
                </Box>
            </Box>
        </Box>
    );
}

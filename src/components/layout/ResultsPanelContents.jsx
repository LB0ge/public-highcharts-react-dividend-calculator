import { useCalculator } from '../../context/useCalculator';
import { useState } from 'react';
import { Box, useTheme, Switch, FormControlLabel } from '@mui/material';

import KpiCards from './KpiCards';
import FinalCompositionChart from '../charts/FinalCompositionChart';
import ValueOverTimeChart from '../charts/ValueOverTimeChart';
import Toggles from './Toggles';

export default function ResultsPanelContents() {
    const theme = useTheme();
    const { view, results } = useCalculator();
    const [showComposition, setShowComposition] = useState(false);
    const [showLowerUpper, setShowLowerUpper] = useState(true);

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

            {/* Main chart with toggle */}
            <Box
                sx={{
                    flex: 1,
                    position: 'relative'
                }}
            >
                <Toggles
                    showComposition={showComposition}
                    setShowComposition={setShowComposition}
                    showLowerUpper={showLowerUpper}
                    setShowLowerUpper={setShowLowerUpper}
                />

                <ValueOverTimeChart
                    view={view}
                    results={results}
                    showComposition={showComposition}
                    showLowerUpper={showLowerUpper}
                />
            </Box>
        </Box>
    );
}

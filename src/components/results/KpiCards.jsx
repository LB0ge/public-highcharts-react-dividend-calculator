import { Box, useTheme } from '@mui/material';
import { formatCurrency } from '../../utils/currency';

import KpiCard from './KpiCard';

export default function KpiCards({ view }) {
    const theme = useTheme();
    const { finalReinvestmentValue, finalBankValue } = view;
    return (
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
            <KpiCard
                title="Reinvestment Scenario"
                value={formatCurrency(finalReinvestmentValue)}
                color="success"
                valueGradientTo="secondary"
            />
            <KpiCard
                title="Bank Scenario"
                value={formatCurrency(finalBankValue)}
                color="primary"
                valueGradientTo="secondary"
            />
            <KpiCard
                title="Difference"
                value={formatCurrency(finalReinvestmentValue - finalBankValue)}
                color="secondary"
                valueGradientTo="primary"
            />
        </Box>
    );
}

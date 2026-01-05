import { Box, Stack, useTheme } from '@mui/material';

import PositionSection from './PositionSection';
import DividendSection from './DividendSection';
import GrowthSection from './GrowthSection';
import BankTaxSection from './BankTaxSection';

export default function InputPanelContents() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(2),
                height: '100%'
            }}
        >
            <Stack
                spacing={theme.spacing(2)}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pr: theme.spacing(1),
                    '&::-webkit-scrollbar': {
                        width: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: theme.palette.background.default
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.divider,
                        borderRadius: '3px',
                        '&:hover': {
                            backgroundColor: theme.palette.text.disabled
                        }
                    }
                }}
            >
                <PositionSection />
                <DividendSection />
                <GrowthSection />
                <BankTaxSection />
            </Stack>
        </Box>
    );
}

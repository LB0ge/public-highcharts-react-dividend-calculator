import { Box, Typography } from '@mui/material';

export default function ValueDisplay({ label, value }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
            <Typography color="text.secondary">{label}:</Typography>
            <Typography variant="body1">{value}</Typography>
        </Box>
    );
}

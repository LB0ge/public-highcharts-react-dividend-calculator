import { Box, Typography, Divider } from '@mui/material';

export default function Panel({ title, action, children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 36,
                    gap: 1
                }}
            >
                {title ? (
                    <Typography
                        variant="h5"
                        sx={{ whiteSpace: 'nowrap', pr: 1 }}
                    >
                        {title}
                    </Typography>
                ) : (
                    <span />
                )}
                {action || null}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
        </Box>
    );
}

import { Box, Typography, useTheme, IconButton, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';

export default function Header() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    return (
        <Box
            sx={{
                mb: theme.spacing(2),
                pb: theme.spacing(1),
                borderBottom: `2px solid ${theme.palette.divider}`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Dividend Reinvestment Calculator
                </Typography>

                <IconButton
                    size="small"
                    aria-label="About this app"
                    onClick={handleOpen}
                    sx={{ ml: 2 }}
                >
                    <InfoOutlinedIcon fontSize="small" />
                </IconButton>
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { p: 2, maxWidth: 360 } } }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    About
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Use this calculator to compare reinvesting dividends versus
                    putting them in the bank. Adjust parameters in the input
                    panel to see projected values and composition over time.
                </Typography>
            </Popover>
        </Box>
    );
}

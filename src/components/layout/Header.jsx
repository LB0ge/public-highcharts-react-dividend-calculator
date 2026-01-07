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
                mb: theme.spacing(1),
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
                slotProps={{
                    paper: {
                        sx: {
                            p: 3,
                            maxWidth: 520,
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }
                    }
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    About This Calculator
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mt: 2, mb: 1 }}
                >
                    What It Does
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    This tool compares two dividend strategies over time:{' '}
                    <strong>reinvesting</strong> dividends to buy more shares
                    versus <strong>banking</strong> dividends in a savings
                    account. It projects total portfolio value, dividend income,
                    and composition breakdowns for both scenarios.
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mt: 2, mb: 1 }}
                >
                    Key Assumptions
                </Typography>
                <Box component="ul" sx={{ mt: 0, pl: 2.5 }}>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Annual compounding:</strong> Dividends are paid
                        once per year at year-end
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Dividend calculation:</strong> Each year's
                        dividend is calculated as a percentage of the current
                        share price multiplied by the number of shares held at
                        that time
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Whole shares only:</strong> Reinvestment buys
                        whole shares; leftover cash stays in the account for
                        future purchases
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Taxes on dividends:</strong> Applied before
                        reinvestment or banking; capital gains on share
                        appreciation are not taxed
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Bank interest:</strong> Compounds annually and
                        is not taxed
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Constant rates:</strong> Growth and yield
                        percentages remain fixed throughout the holding period
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>No transaction costs:</strong> Assumes zero fees
                        for buying shares or maintaining accounts
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1.5,
                        p: 1.5,
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                        fontStyle: 'italic'
                    }}
                >
                    <strong>Note:</strong> This calculator is intended for rough
                    comparison and educational purposes. Real-world results will
                    vary due to market volatility, changing dividend policies,
                    transaction fees, and tax implications not modeled here.
                    Always consult with a financial advisor for investment
                    decisions.
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mt: 2, mb: 1 }}
                >
                    How to Use
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Adjust the input parameters on the left to match your
                    investment scenario:
                </Typography>
                <Box component="ul" sx={{ mt: 0, pl: 2.5, mb: 2 }}>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Position:</strong> Number of shares and price
                        per share define your initial investment
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Dividends:</strong> Annual dividend yield
                        (percentage of current share price)
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Growth:</strong> Expected annual stock price
                        appreciation (can set lower/upper bounds for range
                        projections)
                    </Typography>
                    <Typography
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        <strong>Bank & Tax:</strong> Savings account interest
                        rate and dividend tax percentage
                    </Typography>
                </Box>
            </Popover>
        </Box>
    );
}

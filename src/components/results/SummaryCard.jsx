import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { formatCurrency } from '../../utils/currency';

export default function KpiCards({ view, inputs }) {
    const theme = useTheme();
    const { finalReinvestmentValue, finalBankValue, principal } = view;

    const initialInvestment = formatCurrency(principal);
    const dividendYield = inputs.dividendYieldPercent.toFixed(1);
    const holdingPeriod = inputs.holdingPeriodYears;
    const bankInterest = inputs.bankInterestPercent.toFixed(1);
    const scenarioAValue = formatCurrency(finalReinvestmentValue);
    const scenarioBValue = formatCurrency(finalBankValue);
    const difference = formatCurrency(finalReinvestmentValue - finalBankValue);

    return (
        <Card elevation={1}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Investment Projection Summary
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                    Based on an initial investment of{' '}
                    <strong>{initialInvestment}</strong> in a dividend-paying
                    equity with an estimated annual dividend yield of{' '}
                    <strong>{dividendYield}%</strong>, your portfolio is
                    projected to grow over a{' '}
                    <strong>{holdingPeriod}-year</strong> investment horizon
                    under two distinct strategies:
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 1.5, pl: 2, lineHeight: 1.7 }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.success.dark
                        }}
                    >
                        Scenario A
                    </Box>{' '}
                    — Net dividends are automatically reinvested to acquire
                    additional shares, resulting in an estimated portfolio value
                    of <strong>{scenarioAValue}</strong> at maturity.
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 1.5, pl: 2, lineHeight: 1.7 }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.secondary.main
                        }}
                    >
                        Scenario B
                    </Box>{' '}
                    — Net dividends are withdrawn and deposited into a savings
                    account earning <strong>{bankInterest}%</strong> annual
                    interest (after tax), with an estimated combined value of{' '}
                    <strong>{scenarioBValue}</strong> at maturity.
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}
                >
                    The projected difference between strategies (
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.success.dark
                        }}
                    >
                        A
                    </Box>
                    -
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.secondary.main
                        }}
                    >
                        B
                    </Box>
                    ) is <strong>{difference}</strong>. Both scenarios
                    incorporate dividend growth projections and equity
                    appreciation assumptions.
                </Typography>
            </CardContent>
        </Card>
    );
}

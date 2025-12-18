import { Card, CardContent, Typography, useTheme } from '@mui/material';

export default function KpiCard({
    title,
    value,
    color = 'primary',
    valueGradientTo = 'secondary'
}) {
    const theme = useTheme();

    const bg = `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${
        theme.palette[color]?.light ?? theme.palette.primary.light
    }08 100%)`;
    const valueGradient = `linear-gradient(135deg, ${
        theme.palette[color]?.main ?? theme.palette.primary.main
    } 0%, ${
        theme.palette[valueGradientTo]?.main ?? theme.palette.secondary.main
    } 100%)`;

    return (
        <Card
            sx={{
                background: bg,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(31, 41, 55, 0.15)'
                }
            }}
        >
            <CardContent>
                <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="subtitle2"
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        background: valueGradient,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700
                    }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

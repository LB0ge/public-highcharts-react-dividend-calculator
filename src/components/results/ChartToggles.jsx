import { Box, FormControlLabel, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ChartToggles({
    showComposition,
    setShowComposition,
    showLowerUpper,
    setShowLowerUpper
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                top: theme.spacing(-1),
                right: theme.spacing(0),
                zIndex: 1,
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                px: 1,
                py: 0.25
            }}
        >
            <FormControlLabel
                control={
                    <Switch
                        size="small"
                        checked={showComposition}
                        onChange={(e) => setShowComposition(e.target.checked)}
                    />
                }
                label="Show composition"
                sx={{
                    m: 0,
                    '& .MuiFormControlLabel-label': { fontSize: 12 }
                }}
            />
            <FormControlLabel
                control={
                    <Switch
                        size="small"
                        checked={showLowerUpper}
                        onChange={(e) => setShowLowerUpper(e.target.checked)}
                    />
                }
                label="Show lower/upper estimates"
                sx={{
                    m: 0,
                    '& .MuiFormControlLabel-label': { fontSize: 12 }
                }}
            />
        </Box>
    );
}

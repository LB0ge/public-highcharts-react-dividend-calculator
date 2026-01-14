import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function DividendModeToggle({ dividendMode, setDividendMode }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'flex-end',
                top: theme.spacing(-1),
                right: theme.spacing(0),
                zIndex: 10
            }}
        >
            <ToggleButtonGroup
                size="small"
                exclusive
                value={dividendMode}
                onChange={(_, val) => {
                    if (val !== null) setDividendMode(val);
                }}
            >
                <ToggleButton value="net">Net</ToggleButton>
                <ToggleButton value="gross">Gross</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

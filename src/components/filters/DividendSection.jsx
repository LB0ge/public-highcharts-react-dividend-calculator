import { Box, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import NumberField from '../NumberField';
import { useCalculator } from '../../context/useCalculator';

export default function DividendSection() {
    const { inputs, setInput } = useCalculator();

    const handleChange = (key) => (value) => {
        setInput(key, value === '' ? 0 : value);
    };

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" color="text.secondary">
                Dividend Data
            </Typography>

            <Box sx={{ px: 2 }}>
                <Typography variant="body2">Annual dividend yield</Typography>
                <Slider
                    aria-label="Annual dividend yield"
                    value={inputs.dividendYieldPercent ?? 0}
                    valueLabelDisplay="auto"
                    step={0.1}
                    min={0.0}
                    max={20.0}
                    onChange={(_, value) =>
                        setInput('dividendYieldPercent', value)
                    }
                />
            </Box>

            <NumberField
                label="Holding period (years)"
                value={inputs.holdingPeriodYears ?? 0}
                unit="years"
                onChange={handleChange('holdingPeriodYears')}
            />
        </Box>
    );
}

import { Box, Typography } from '@mui/material';
import NumberField from './NumberField';
import { useCalculator } from '../../context/useCalculator';

export default function GrowthSection() {
    const { inputs, setInput } = useCalculator();
    const step = 0.1;

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" color="text.secondary">
                Growth assumptions
            </Typography>
            <NumberField
                label={'Annual stock appreciation'}
                value={inputs.stockAppreciationPercent ?? 0}
                step={step}
                min={-99.9}
                max={1000}
                unit="%"
                onChange={(value) =>
                    setInput(
                        'stockAppreciationPercent',
                        value === '' ? 0 : value
                    )
                }
            />
        </Box>
    );
}

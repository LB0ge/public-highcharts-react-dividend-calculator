import { Box, Typography } from '@mui/material';
import NumberField from './NumberField';
import { useCalculator } from '../../context/useCalculator';
import { formatCurrency } from '../../utils/currency';

export default function PositionSection() {
    const { inputs, setInput } = useCalculator();

    const handleChange = (key) => (value) => {
        setInput(key, value === '' ? 0 : value);
    };

    // Smart step: jump to 1.00 when under $1, then increment by 1
    const priceStep =
        inputs.pricePerShare > 0 && inputs.pricePerShare < 1
            ? 1 - inputs.pricePerShare
            : 1;

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" color="text.secondary">
                Starting Position
            </Typography>

            <NumberField
                label="Number of shares"
                value={inputs.numberOfShares ?? 0}
                min={1}
                onChange={handleChange('numberOfShares')}
            />

            <NumberField
                label="Price per share"
                value={inputs.pricePerShare ?? 0}
                min={0.01}
                step={priceStep}
                unit="$"
                onChange={handleChange('pricePerShare')}
            />

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                <Typography color="text.secondary">Principal:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatCurrency(
                        (inputs.numberOfShares ?? 0) *
                            (inputs.pricePerShare ?? 0)
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

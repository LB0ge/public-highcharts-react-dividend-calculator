import { Box, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useCalculator } from '../../context/useCalculator';

export default function BankTaxSection() {
    const { inputs, setInput } = useCalculator();

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" color="text.secondary">
                Bank & Tax
            </Typography>

            <Box sx={{ px: 2 }}>
                <Typography variant="body2">Bank interest rate</Typography>
                <Slider
                    aria-label="Interest Rate"
                    value={inputs.bankInterestPercent ?? 0}
                    valueLabelDisplay="auto"
                    step={0.1}
                    min={0.0}
                    max={10.0}
                    onChange={(_, value) =>
                        setInput('bankInterestPercent', value)
                    }
                />
            </Box>

            <Box sx={{ px: 2 }}>
                <Typography variant="body2">Dividend tax %</Typography>
                <Slider
                    aria-label="Dividend tax"
                    value={inputs.dividendTaxPercent ?? 0}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={50}
                    onChange={(_, value) =>
                        setInput('dividendTaxPercent', value)
                    }
                />
            </Box>
        </Box>
    );
}

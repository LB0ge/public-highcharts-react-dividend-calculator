import { Box, Typography } from '@mui/material';
import NumberField from '../NumberField';
import { useCalculator } from '../../context/useCalculator';

export default function GrowthSection() {
    const { inputs, setInput } = useCalculator();

    const handleNestedChange = (key, field) => (value) => {
        const prev = inputs[key] || { lower: 0, expected: 0, upper: 0 };
        setInput(key, { ...prev, [field]: value === '' ? 0 : value });
    };

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6" color="text.secondary">
                Growth assumptions
            </Typography>

            <Box>
                <Typography variant="subtitle2" paddingBottom={2}>
                    Annual stock appreciation
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <NumberField
                        label="Lower"
                        value={inputs.stockAppreciationPercent?.lower ?? 0}
                        step={0.1}
                        unit="%"
                        onChange={handleNestedChange(
                            'stockAppreciationPercent',
                            'lower'
                        )}
                    />
                    <NumberField
                        label="Expected"
                        value={inputs.stockAppreciationPercent?.expected ?? 0}
                        step={0.1}
                        unit="%"
                        onChange={handleNestedChange(
                            'stockAppreciationPercent',
                            'expected'
                        )}
                    />
                    <NumberField
                        label="Upper"
                        value={inputs.stockAppreciationPercent?.upper ?? 0}
                        step={0.1}
                        unit="%"
                        onChange={handleNestedChange(
                            'stockAppreciationPercent',
                            'upper'
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
}

import { useMemo, useState } from 'react';
import { CalculatorContext } from './CalculatorContext';
import { runAllCalculations } from '../utils/calculations';

const defaultInputs = {
    numberOfShares: 180,
    pricePerShare: 50,
    holdingPeriodYears: 15,

    dividendYieldPercent: 6.5,

    stockAppreciationPercent: { lower: 3, expected: 4, upper: 5 },

    bankInterestPercent: 4.2,
    dividendTaxPercent: 25,

    currencyCode: 'USD'
};

export function CalculatorProvider({ children }) {
    const [inputs, setInputs] = useState(defaultInputs);

    // const initialInvestment = inputs.numberOfShares * inputs.pricePerShare;

    const results = useMemo(() => {
        return runAllCalculations(inputs);
    }, [inputs]);

    function setInput(key, value) {
        setInputs((prev) => ({ ...prev, [key]: value }));
    }

    const value = {
        inputs,
        setInput,
        results
    };

    return (
        <CalculatorContext.Provider value={value}>
            {children}
        </CalculatorContext.Provider>
    );
}

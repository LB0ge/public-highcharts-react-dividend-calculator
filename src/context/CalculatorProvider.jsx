import { useMemo, useState } from 'react';
import { CalculatorContext } from './CalculatorContext';
import {
    runAllCalculations,
    buildResultsViewModel
} from '../utils/calculations';

const defaultInputs = {
    numberOfShares: 180,
    pricePerShare: 50,
    holdingPeriodYears: 15,

    dividendYieldPercent: 6.5,

    stockAppreciationPercent: 4,

    bankInterestPercent: 4.2,
    dividendTaxPercent: 25
};

export function CalculatorProvider({ children }) {
    const [inputs, setInputs] = useState(defaultInputs);

    const results = useMemo(() => runAllCalculations(inputs), [inputs]);
    const view = useMemo(() => buildResultsViewModel(results), [results]);

    function setInput(key, value) {
        setInputs((prev) => ({ ...prev, [key]: value }));
    }

    const value = {
        inputs,
        setInput,
        results,
        view
    };

    return (
        <CalculatorContext.Provider value={value}>
            {children}
        </CalculatorContext.Provider>
    );
}

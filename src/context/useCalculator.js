import { useContext } from 'react';
import { CalculatorContext } from './CalculatorContext';

export function useCalculator() {
    return useContext(CalculatorContext);
}

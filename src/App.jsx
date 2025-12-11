import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { setHighcharts } from '@highcharts/react';
import Highcharts from './components/charts/chart-defaults.js';

import customTheme from './theme/customTheme';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import { CalculatorProvider } from './context/CalculatorProvider';

setHighcharts(Highcharts);

export default function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <CalculatorProvider>
                <DashboardLayout />
            </CalculatorProvider>
        </ThemeProvider>
    );
}

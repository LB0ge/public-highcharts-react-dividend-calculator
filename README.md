# Dividend Reinvestment Calculator

An interactive React application that compares two dividend strategies: **reinvesting dividends** to buy more shares versus **banking dividends** in a savings account. Visualize projected portfolio values, dividend income, and composition breakdowns over time.

## Features

-   📊 **Interactive Visualizations** - Real-time charts powered by Highcharts
-   💰 **Dual Strategy Comparison** - Reinvestment vs. Banking scenarios
-   **Dividend Tracking** - View gross and net dividend payouts per year with mode toggle
-   **Composition Insights** - Optional composition stack to visualize share value vs. accumulated cash
-   🎨 **Modern UI** - Built with Material-UI v7 and custom theming
-   ⚡ **Fast & Responsive** - Optimized with React 19 and Vite

## Technology Stack

-   **React 19** - UI framework with modern hooks and concurrent features
-   **Vite** - Fast build tool and dev server
-   **Material-UI v7** - Component library with Emotion for styling
-   **Highcharts v12** - Interactive charting via `@highcharts/react` v4 JSX API
-   **ESLint v9** - Code quality with flat config

## Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
highcharts-react-dividend-calculator/
├── public/                  # Static assets
├── src/
│   ├── App.jsx             # Root component, Highcharts setup
│   ├── main.jsx            # App entry point
│   ├── index.css           # Global styles
│   ├── components/
│   │   ├── inputs/         # Input form components
│   │   │   ├── InputView.jsx
│   │   │   ├── NumberField.jsx
│   │   │   ├── PositionSection.jsx
│   │   │   ├── DividendSection.jsx
│   │   │   ├── GrowthSection.jsx
│   │   │   └── BankTaxSection.jsx
│   │   ├── layout/         # Layout components
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Panel.jsx
│   │   └── results/        # Results display components
│   │       ├── ResultsView.jsx
│   │       ├── SummaryCard.jsx
│   │       ├── CompositionToggle.jsx
│   │       ├── DividendModeToggle.jsx
│   │       └── charts/
│   │           ├── chart-defaults.js
│   │           ├── ChartComponent.jsx
│   │           ├── InvestmentValuePerYearChart.jsx
│   │           ├── DividendsPerYearChart.jsx
│   │           ├── FinalCompositionChart.jsx
│   │           └── SharesOverTimeChart.jsx
│   ├── context/            # React Context for state management
│   │   ├── CalculatorContext.js
│   │   ├── CalculatorProvider.jsx
│   │   └── useCalculator.js
│   ├── theme/              # MUI theme configuration
│   │   └── customTheme.js
│   └── utils/              # Utility functions
│       ├── calculations.js  # Core calculation logic
│       └── currency.js      # Currency formatting
├── .github/
│   └── copilot-instructions.md  # Development guidelines
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Architecture Overview

### State Management

The app uses React Context for centralized state:

-   **CalculatorProvider** - Holds all inputs, runs calculations via `useMemo`, and exposes:
    -   `inputs` - User-configurable parameters (shares, price, yields, rates, etc.)
    -   `setInput()` - Update function for any input
    -   `results` - Raw calculation output (time series for both scenarios)
    -   `view` - Derived view model optimized for charts and KPI cards

### Calculation Logic

Pure, deterministic functions in `src/utils/calculations.js`:

-   **Two scenarios**: `reinvest` (buy more shares with dividends) and `bank` (deposit dividends in savings)
-   **Annual compounding**: Dividends paid once per year; bank interest compounds annually
-   **Whole shares**: Reinvestment only buys whole shares; leftover cash accumulates
-   **Output**: Year-by-year time series with portfolio value, dividends (gross/net), bank balance, and final composition breakdown

### Highcharts Integration

Using the **Highcharts React v4 JSX API**:

-   Charts render via JSX components (`HighchartsChart`, `SplineSeries`, `ColumnSeries`, etc.)
-   `ChartComponent` wrapper provides consistent sizing and shared options
-   Theme colors pulled from MUI theme for visual consistency
-   Animations preserved when toggling between net/gross dividends

### Key Components

-   **DashboardLayout** - Two-panel layout (inputs on left, results on right)
-   **InputView** - FoSummary card and charts with toggle controls
-   **UI Controls**:
    -   `CompositionToggle` - Toggle to show/hide composition stack on the investment value chart
    -   `DividendModeToggle` - Switch between net and gross dividend display
-   **Charts**:
    -   `InvestmentValuePerYearChart` - Time series showing portfolio value over time with optional composition stack
    -   `DividendsPerYearChart` - Column chart showing yearly dividends (net or gross)
    -   `FinalCompositionChart` - Stacked bar chart comparing final portfolio composition
    -   `SharesOverTimeChart` - Line chart tracking share count growth over times)
    -   `FinalCompositionChart` - Stacked bar chart comparing final portfolio composition

## Usage

1. \*\*Set Initial PosiSummary card shows final values and extra gain from reinvestment; charts visualize growth over time
2. **Toggle Views**: Switch between net/gross dividends and show/hide portfolio composition details
3. **Configure Dividends**: Annual dividend yield percentage
4. **Set Growth Expectations**: Stock price appreciation percentage
5. **Adjust Bank & Tax**: Savings interest rate and dividend tax percentage
6. **View Results**: KPI cards show final values and extra gain from reinvestment; charts visualize growth over time

### Example Scenarios

-   **High-growth tech stock**: 2% yield, 8% appreciation, 15 years
-   **Stable dividend aristocrat**: 5% yield, 3% appreciation, 20 years
-   **High-yield income play**: 8% yield, 1% appreciation, 10 years

## Key Assumptions

-   Dividends calculated as percentage of current share price
-   Annual compounding (not quarterly or monthly)
-   Taxes applied to dividends before reinvestment or banking
-   No capital gains tax on share appreciation
-   Bank interest is not taxed
-   Constant growth and yield rates throughout holding period
-   No transaction fees or account maintenance costs

**Note**: This calculator is intended for rough comparison and educational purposes. Real-world results will vary due to market volatility, changing dividend policies, and factors not modeled here.

## Future Enhancements

-   [ ] Dark mode support (?).
-   [ ] Fix first chart render series color issue.
-   [ ] Convert to TypeScript (?).
-   [ ] Ensure x-axis ticks are always aligned between value chart and dividend chart (currently an issue when y-axis labels differ in width).

// Dividend frequency removed — calculations use annual periods only (1 per year).

// Convert annual percent rate to per period rate
function annualToPeriodRate(annualPercent, periodsPerYear) {
    if (annualPercent === 0) return 0;
    const annualRate = annualPercent / 100;
    return Math.pow(1 + annualRate, 1 / periodsPerYear) - 1;
}

// Calculate data data points for the different scenarios
function calculateScenario(inputs, scenarioType, caseKey) {
    const {
        numberOfShares,
        pricePerShare,
        holdingPeriodYears,
        dividendYieldPercent,
        stockAppreciationPercent, // {lower, expected, upper}
        bankInterestPercent,
        dividendTaxPercent
    } = inputs;

    // use annual periods for both dividends and bank interest
    const periodsPerYear = 1;
    const totalPeriods = holdingPeriodYears * periodsPerYear;

    const priceGrowthPerPeriod = annualToPeriodRate(
        stockAppreciationPercent[caseKey],
        periodsPerYear
    );

    // Bank interest is annualized as well (one period per year)
    const bankRatePerPeriod = annualToPeriodRate(
        bankInterestPercent,
        periodsPerYear
    );

    let shares = numberOfShares,
        price = pricePerShare;

    const initialDividendYieldAnnual = dividendYieldPercent / 100;
    let dividendYieldPerPeriod = initialDividendYieldAnnual / periodsPerYear;

    let bankBalance = 0,
        cumulativeDividendsGross = 0,
        cumulativeDividendsNet = 0;

    const points = [];

    function pushPoint(stepIndex) {
        const yearFraction = stepIndex / periodsPerYear,
            portfolioValue = shares * price,
            totalValue = portfolioValue + bankBalance;

        points.push({
            yearFraction,
            totalValue,
            portfolioValue,
            bankBalance,
            shares,
            price,
            cumulativeDividendsGross,
            cumulativeDividendsNet
        });
    }

    pushPoint(0);
    for (let step = 0; step < totalPeriods; step++) {
        price = price * (1 + priceGrowthPerPeriod);

        const dividendPerShare = price * dividendYieldPerPeriod;
        const grossDividends = shares * dividendPerShare;
        const netDividends = grossDividends * (1 - dividendTaxPercent / 100);
        cumulativeDividendsGross += grossDividends;
        cumulativeDividendsNet += netDividends;

        if (scenarioType === 'reinvest') {
            // Reinvest only in whole shares
            const availableToInvest = bankBalance + netDividends;
            const wholeSharesToBuy = Math.floor(availableToInvest / price);
            const cost = wholeSharesToBuy * price;

            if (wholeSharesToBuy > 0) {
                shares += wholeSharesToBuy;
            }

            // Leftover cash stays in bankBalance for future periods
            bankBalance = availableToInvest - cost;
        } else {
            // Bank scenario: grow bank balance and add new dividends
            bankBalance = bankBalance * (1 + bankRatePerPeriod) + netDividends;
        }

        pushPoint(step + 1);
    }

    return points;
}

function last(arr) {
    return arr.length ? arr[arr.length - 1] : null;
}

export function runAllCalculations(inputs) {
    const scenarioTypes = ['reinvest', 'bank'],
        caseKeys = ['lower', 'expected', 'upper'],
        results = {
            reinvest: {},
            bank: {}
        };

    scenarioTypes.forEach((type) => {
        results[type] = {};
        caseKeys.forEach((key) => {
            results[type][key] = calculateScenario(inputs, type, key);
        });
    });

    const summary = {
        finalYear: inputs.holdingPeriodYears,
        reinvest: {},
        bank: {},
        extraFromReinvestExpected: 0,
        // composition per case: { lower: {...}, expected: {...}, upper: {...} }
        reinvestComposition: {},
        bankComposition: {}
    };

    caseKeys.forEach((key) => {
        const reinvestLast = last(results.reinvest[key]);
        const bankLast = last(results.bank[key]);

        summary.reinvest[key] = reinvestLast ? reinvestLast.totalValue : 0;
        summary.bank[key] = bankLast ? bankLast.totalValue : 0;

        // compute composition components and store them
        const initialInvestment =
            (inputs.numberOfShares || 0) * (inputs.pricePerShare || 0);

        const reinvest_dividends = reinvestLast
            ? reinvestLast.cumulativeDividendsNet || 0
            : 0;
        let reinvest_growth = reinvestLast
            ? reinvestLast.totalValue - initialInvestment - reinvest_dividends
            : 0;
        if (reinvest_growth < 0) reinvest_growth = 0;

        const bank_dividends = bankLast
            ? bankLast.cumulativeDividendsNet || 0
            : 0;
        let bank_growth = bankLast
            ? bankLast.totalValue - initialInvestment - bank_dividends
            : 0;
        if (bank_growth < 0) bank_growth = 0;

        summary.reinvestComposition[key] = {
            initial: initialInvestment,
            dividends: reinvest_dividends,
            growth: reinvest_growth
        };

        summary.bankComposition[key] = {
            initial: initialInvestment,
            dividends: bank_dividends,
            growth: bank_growth
        };
    });

    summary.extraFromReinvestExpected =
        summary.reinvest.expected - summary.bank.expected;

    return {
        reinvest: results.reinvest,
        bank: results.bank,
        finalSummary: summary
    };
}

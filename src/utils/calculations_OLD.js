// Backup of calculations.js prior to expected-only simplification
// Date: 2026-01-06

// Dividend frequency removed — calculations use annual periods only (1 per year).

// Convert percent to rate
const percentToRate = (percent) => (percent === 0 ? 0 : percent / 100);

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

    const priceGrowthAnnual = percentToRate(stockAppreciationPercent[caseKey]),
        bankRateAnnual = percentToRate(bankInterestPercent),
        dividendYieldAnnual = percentToRate(dividendYieldPercent);

    let shares = numberOfShares,
        price = pricePerShare,
        bankBalance = 0,
        cumulativeDividendsGross = 0,
        cumulativeDividendsNet = 0,
        dividendsGross = 0,
        dividendsNet = 0;

    const points = [];

    function pushPoint(yearIndex) {
        const portfolioValue = shares * price,
            totalValue = portfolioValue + bankBalance;

        points.push({
            yearIndex,
            totalValue,
            portfolioValue,
            bankBalance,
            shares,
            price,
            dividendsGross,
            dividendsNet,
            cumulativeDividendsGross,
            cumulativeDividendsNet
        });
    }

    // Initial point (year 0) with zero dividends
    pushPoint(0);
    for (let step = 0; step < holdingPeriodYears; step++) {
        price = price * (1 + priceGrowthAnnual);

        // Compute per-year dividends directly (no intermediate variables)
        dividendsGross = shares * (price * dividendYieldAnnual);
        dividendsNet = dividendsGross * (1 - dividendTaxPercent / 100);
        cumulativeDividendsGross += dividendsGross;
        cumulativeDividendsNet += dividendsNet;

        if (scenarioType === 'reinvest') {
            // Reinvest only in whole shares
            const availableToInvest = bankBalance + dividendsNet;
            const wholeSharesToBuy = Math.floor(availableToInvest / price);
            const cost = wholeSharesToBuy * price;

            if (wholeSharesToBuy > 0) {
                shares += wholeSharesToBuy;
            }

            // Leftover cash stays in bankBalance for future periods
            bankBalance = availableToInvest - cost;
        } else {
            // Bank scenario: grow bank balance and add new dividends
            bankBalance = bankBalance * (1 + bankRateAnnual) + dividendsNet;
        }

        pushPoint(step + 1);
    }

    return points;
}

const last = (arr) => (arr.length ? arr[arr.length - 1] : null);

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

        const reinvestDividends = reinvestLast
            ? reinvestLast.cumulativeDividendsNet || 0
            : 0;
        let reinvestGrowth = reinvestLast
            ? reinvestLast.totalValue - initialInvestment - reinvestDividends
            : 0;
        if (reinvestGrowth < 0) reinvestGrowth = 0;

        const bankDividends = bankLast
            ? bankLast.cumulativeDividendsNet || 0
            : 0;
        let bankGrowth = bankLast
            ? bankLast.totalValue - initialInvestment - bankDividends
            : 0;
        if (bankGrowth < 0) bankGrowth = 0;

        summary.reinvestComposition[key] = {
            initial: initialInvestment,
            dividends: reinvestDividends,
            growth: reinvestGrowth
        };

        summary.bankComposition[key] = {
            initial: initialInvestment,
            dividends: bankDividends,
            growth: bankGrowth
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

// Build a lightweight view model for UI components from raw results
export function buildResultsViewModel(results) {
    const totalReinvestmentValueExpected = (
        results.reinvest.expected || []
    ).map((point) => point.totalValue);
    const totalValueNoReinvestmentExpected = (results.bank.expected || []).map(
        (point) => point.totalValue
    );

    const totalReinvestmentValueLower = (results.reinvest.lower || []).map(
        (point) => point.totalValue
    );
    const totalReinvestmentValueUpper = (results.reinvest.upper || []).map(
        (point) => point.totalValue
    );
    const totalReinvestmentValueLowerUpper = totalReinvestmentValueLower.map(
        (lowerValue, index) => [lowerValue, totalReinvestmentValueUpper[index]]
    );

    const finalReinvestmentValue =
        totalReinvestmentValueExpected[
            Math.max(0, totalReinvestmentValueExpected.length - 1)
        ] || 0;
    const finalBankValue =
        totalValueNoReinvestmentExpected[
            Math.max(0, totalValueNoReinvestmentExpected.length - 1)
        ] || 0;

    const comp = results.finalSummary || {};
    const reinvestComp = (comp.reinvestComposition &&
        comp.reinvestComposition.expected) || {
        initial: 0,
        dividends: 0,
        growth: 0
    };
    const bankComp = (comp.bankComposition && comp.bankComposition.expected) || {
        initial: 0,
        dividends: 0,
        growth: 0
    };

    const principal = reinvestComp.initial || 0;
    const reinvestDividends = reinvestComp.dividends || 0;
    const reinvestGrowth = reinvestComp.growth || 0;
    const bankDividends = bankComp.dividends || 0;
    const bankGrowth = bankComp.growth || 0;

    // Per-year dividends (net), include year 0 for alignment with other charts
    const dividendsPerYearReinvestExpected = (
        results.reinvest.expected || []
    ).map((p) => p.dividendsNet || 0);
    const dividendsPerYearBankExpected = (results.bank.expected || []).map(
        (p) => p.dividendsNet || 0
    );

    // Per-year dividends (gross), include year 0
    const dividendsPerYearReinvestGrossExpected = (
        results.reinvest.expected || []
    ).map((p) => p.dividendsGross || 0);
    const dividendsPerYearBankGrossExpected = (results.bank.expected || []).map(
        (p) => p.dividendsGross || 0
    );

    return {
        totalReinvestmentValueExpected,
        totalValueNoReinvestmentExpected,
        totalReinvestmentValueLowerUpper,
        finalReinvestmentValue,
        finalBankValue,
        principal,
        reinvestDividends,
        reinvestGrowth,
        bankDividends,
        bankGrowth,
        dividendsPerYearReinvestExpected,
        dividendsPerYearBankExpected,
        dividendsPerYearReinvestGrossExpected,
        dividendsPerYearBankGrossExpected
    };
}

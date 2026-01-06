// Dividend frequency removed — calculations use annual periods only (1 per year).

// Convert percent to rate
const percentToRate = (percent) => (percent === 0 ? 0 : percent / 100);

// Calculate data points for scenarios using a single (flat) value
function calculateScenario(inputs, scenarioType) {
    const {
        numberOfShares,
        pricePerShare,
        holdingPeriodYears,
        dividendYieldPercent,
        stockAppreciationPercent,
        bankInterestPercent,
        dividendTaxPercent
    } = inputs;

    // Accept both a flat number or an object (for backward compatibility)
    const priceGrowthAnnual = percentToRate(
            typeof stockAppreciationPercent === 'object'
                ? stockAppreciationPercent.expected
                : stockAppreciationPercent
        ),
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
    const results = {
        reinvest: calculateScenario(inputs, 'reinvest'),
        bank: calculateScenario(inputs, 'bank')
    };

    const summary = {
        finalYear: inputs.holdingPeriodYears,
        reinvest: 0,
        bank: 0,
        extraFromReinvest: 0,
        reinvestComposition: {},
        bankComposition: {}
    };

    const reinvestLast = last(results.reinvest);
    const bankLast = last(results.bank);

    summary.reinvest = reinvestLast ? reinvestLast.totalValue : 0;
    summary.bank = bankLast ? bankLast.totalValue : 0;

    const initialInvestment =
        (inputs.numberOfShares || 0) * (inputs.pricePerShare || 0);

    const reinvestDividends = reinvestLast
        ? reinvestLast.cumulativeDividendsNet || 0
        : 0;
    let reinvestGrowth = reinvestLast
        ? reinvestLast.totalValue - initialInvestment - reinvestDividends
        : 0;
    if (reinvestGrowth < 0) reinvestGrowth = 0;

    const bankDividends = bankLast ? bankLast.cumulativeDividendsNet || 0 : 0;
    let bankGrowth = bankLast
        ? bankLast.totalValue - initialInvestment - bankDividends
        : 0;
    if (bankGrowth < 0) bankGrowth = 0;

    summary.reinvestComposition = {
        initial: initialInvestment,
        dividends: reinvestDividends,
        growth: reinvestGrowth
    };

    summary.bankComposition = {
        initial: initialInvestment,
        dividends: bankDividends,
        growth: bankGrowth
    };

    summary.extraFromReinvest = summary.reinvest - summary.bank;

    return {
        reinvest: results.reinvest,
        bank: results.bank,
        finalSummary: summary
    };
}

// Build a lightweight view model for UI components from raw results
export function buildResultsViewModel(results) {
    const totalReinvestmentValue = (results.reinvest || []).map(
        (point) => point.totalValue
    );
    const totalValueNoReinvestment = (results.bank || []).map(
        (point) => point.totalValue
    );

    const finalReinvestmentValue =
        totalReinvestmentValue[
            Math.max(0, totalReinvestmentValue.length - 1)
        ] || 0;
    const finalBankValue =
        totalValueNoReinvestment[
            Math.max(0, totalValueNoReinvestment.length - 1)
        ] || 0;

    const comp = results.finalSummary || {};
    const reinvestComp = comp.reinvestComposition || {
        initial: 0,
        dividends: 0,
        growth: 0
    };
    const bankComp = comp.bankComposition || {
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
    const dividendsPerYearReinvest = (results.reinvest || []).map(
        (p) => p.dividendsNet || 0
    );
    const dividendsPerYearBank = (results.bank || []).map(
        (p) => p.dividendsNet || 0
    );

    // Per-year dividends (gross), include year 0
    const dividendsPerYearReinvestGross = (results.reinvest || []).map(
        (p) => p.dividendsGross || 0
    );
    const dividendsPerYearBankGross = (results.bank || []).map(
        (p) => p.dividendsGross || 0
    );

    return {
        totalReinvestmentValue,
        totalValueNoReinvestment,
        finalReinvestmentValue,
        finalBankValue,
        principal,
        reinvestDividends,
        reinvestGrowth,
        bankDividends,
        bankGrowth,
        dividendsPerYearReinvest,
        dividendsPerYearBank,
        dividendsPerYearReinvestGross,
        dividendsPerYearBankGross
    };
}

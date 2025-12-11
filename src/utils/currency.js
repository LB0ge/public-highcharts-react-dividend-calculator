export function formatCurrency(value, currencyCode = 'USD') {
    if (value === null || value === undefined) return '';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

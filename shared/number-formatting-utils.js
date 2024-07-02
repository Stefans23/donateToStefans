"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDollar = void 0;
exports.formatTokenAmount = formatTokenAmount;
exports.USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});
function formatTokenAmount(num) {
    if (num >= 1 && num < 1e3) {
        return removeTrailingZeros(num.toFixed(2));
    }
    if (num >= 1e3 && num < 1e6) {
        return removeTrailingZeros((num / 1e3).toFixed(1)) + 'K';
    }
    if (num >= 1e6 && num < 1e9) {
        return removeTrailingZeros((num / 1e6).toFixed(1)) + 'M';
    }
    if (num >= 1e9 && num < 1e12) {
        return removeTrailingZeros((num / 1e9).toFixed(1)) + 'B';
    }
    if (num >= 1e12) {
        return removeTrailingZeros((num / 1e12).toFixed(1)) + 'T';
    }
    return removeTrailingZeros(num.toPrecision(3));
}
function removeTrailingZeros(value) {
    return value.replace(/\.?0+$/, '');
}
//# sourceMappingURL=number-formatting-utils.js.map
export const paddingTop = 50;
export const paddingBottom = 50;
export const paddingLeft = 35;
export const paddingRight = 20;
export const percentileLabels = [
    "Lower Earners",
    "Mid Lower Earners",
    "Middle Earners",
    "Mid Height Earners",
    "Hight Earners",
];
export const percentileColors = [
    "rgba(163, 168, 169, 0.9)",
    "rgba(159, 208, 151, 0.4)",
    "rgba(159, 208, 151, 0.6)",
    "rgba(159, 208, 151, 0.9)",
    "rgba(141, 194, 132, 1)",
];

export const currencyFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', notation: "compact" }).format;
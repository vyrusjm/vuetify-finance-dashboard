export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPercentage(percentage: number) {
  return percentage == 0
    ? `${percentage.toFixed(2)}%`
    : percentage >= 0
    ? `+${percentage.toFixed(2)}%`
    : `${percentage.toFixed(2)}%`;
}

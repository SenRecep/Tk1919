const currencyFrmatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
});

function differenceBetweenTwoDates(dateFuture: Date, dateNow: Date) {
  return Math.abs(dateFuture.getTime() - dateNow.getTime()) / (1000 * 60 * 60);
}

export function priceCalculator(dateFuture: Date, dateNow: Date, base = 800) {
  const diff = differenceBetweenTwoDates(dateFuture, dateNow);
  const price = base * diff;
  return currencyFrmatter.format(price);
}

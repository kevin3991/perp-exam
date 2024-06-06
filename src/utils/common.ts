export interface IExchangeResult {
  exchanged: number;
  newReserves: {
    from: number;
    to: number;
  };
}

function exchangeCurrency(Rt: number, Ru: number, x: number): IExchangeResult {
  const y = Ru - (Rt * Ru) / (Rt + x);

  return {
    exchanged: y,
    newReserves: {
      from: Rt + x,
      to: Ru - y,
    },
  };
}

function formatNumberWithCommas(text: number): string {
  const parts = text.toString().split('.');
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : '';

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart !== '' ? `${integerPart}.${decimalPart}` : integerPart;
}

function getUuid(): string {
  return Math.random().toString(36).substr(2, 9);
}

export { exchangeCurrency, formatNumberWithCommas, getUuid };

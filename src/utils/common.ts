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

export { exchangeCurrency };

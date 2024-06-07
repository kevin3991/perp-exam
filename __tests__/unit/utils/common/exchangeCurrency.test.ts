import { exchangeCurrency, type IExchangeResult } from '@/utils/common';

describe('exchangeCurrency', () => {
  it('should return exchanged as 0 and adjust reserves correctly when Rt, Ru, or x is 0', () => {
    expect(exchangeCurrency(0, 100, 10)).toEqual<IExchangeResult>({
      exchanged: 0,
      newReserves: {
        from: 10,
        to: 90,
      },
    });

    expect(exchangeCurrency(100, 0, 10)).toEqual<IExchangeResult>({
      exchanged: 0,
      newReserves: {
        from: 110,
        to: -10,
      },
    });

    expect(exchangeCurrency(100, 100, 0)).toEqual<IExchangeResult>({
      exchanged: 0,
      newReserves: {
        from: 100,
        to: 100,
      },
    });
  });

  it('should calculate the exchanged amount and new reserves correctly', () => {
    const result = exchangeCurrency(10000, 1000, 6000);
    expect(result).toEqual<IExchangeResult>({
      exchanged: 375,
      newReserves: {
        from: 16000,
        to: 625,
      },
    });
  });
});

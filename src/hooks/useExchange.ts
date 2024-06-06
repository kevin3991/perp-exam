import {
  type TReserveItem,
  useReserveStore,
  type TCurrency,
} from '@/stores/reserve';
import { exchangeCurrency, type IExchangeResult } from '@/utils/common';
import { useCallback, useMemo } from 'react';

interface IUseExchange {
  items: TReserveItem[];
  exchangeOptions: Array<{ label: string; value: string }>;
  getFromAndTo: (exchangeTo: string) => TCurrency[];
  exchange: (
    from: TCurrency,
    to: TCurrency,
    amount: number
  ) => IExchangeResult | undefined;
  persistLoading: boolean;
}

export const useExchange = (): IUseExchange => {
  const { items, updateAmount, persistLoading } = useReserveStore();

  const exchangeOptions = useMemo(() => {
    return items.flatMap((item, index, arr) => {
      return arr
        .filter((_, i) => i !== index)
        .map((otherItem) => ({
          label: `${item.label} -> ${otherItem.label}`,
          value: `${item.currency}->${otherItem.currency}`,
        }));
    });
  }, [items]);

  const getFromAndTo = useCallback((exchangeTo: string): TCurrency[] => {
    const [from, to] = exchangeTo !== '' ? exchangeTo.split('->') : [];
    return [from, to] as TCurrency[];
  }, []);
  const exchange = useCallback(
    (from: TCurrency, to: TCurrency, amount: number) => {
      const fromItem = items.find((item) => item.currency === from);
      const toItem = items.find((item) => item.currency === to);
      if (fromItem === undefined || toItem === undefined) {
        return;
      }

      const result = exchangeCurrency(fromItem.amount, toItem.amount, amount);
      const { newReserves } = result;

      updateAmount(from, newReserves.from);
      updateAmount(to, newReserves.to);

      return result;
    },
    [items, updateAmount]
  );

  return {
    items,
    exchangeOptions,
    getFromAndTo,
    exchange,
    persistLoading,
  };
};

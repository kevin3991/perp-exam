import {
  type IReserveItem,
  type TCurrency,
  useReserveStore,
} from '@/stores/reserve';
import { useReserveLogStore } from '@/stores/reserveLog';
import {
  exchangeCurrency,
  getUuid,
  type IExchangeResult,
} from '@/utils/common';
import { useCallback, useMemo } from 'react';

interface IUseExchange {
  items: IReserveItem[];
  exchangeOptions: Array<{ label: string; value: string }>;
  getFromAndTo: (exchangeTo: string) => TCurrency[];
  exchange: (
    from: TCurrency,
    to: TCurrency,
    amount: number
  ) => IExchangeResult | undefined;
  persistLoading: boolean;
  reset: () => void;
}

export const useExchange = (): IUseExchange => {
  const {
    items,
    updateAmount,
    persistLoading,
    reset: resetReserve,
  } = useReserveStore();
  const { addLog, reset: resetReserveLog } = useReserveLogStore();

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
      const { exchanged, newReserves } = result;

      updateAmount(from, newReserves.from);
      updateAmount(to, newReserves.to);

      addLog({
        id: getUuid(),
        from,
        fromAmount: amount,
        currentFromAmount: newReserves.from,
        to,
        toAmount: exchanged,
        currentToAmount: newReserves.to,
        status: 'success',
        createdAt: new Date().toISOString(),
      });

      return result;
    },
    [items, updateAmount, addLog]
  );
  const reset = useCallback(() => {
    resetReserve();
    resetReserveLog();
  }, [resetReserve, resetReserveLog]);

  return {
    items,
    exchangeOptions,
    getFromAndTo,
    exchange,
    persistLoading,
    reset,
  };
};

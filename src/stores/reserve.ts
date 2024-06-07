import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type IPersistStore } from '.';

export type TCurrency = 'TWD' | 'USD' | 'EUR';
export interface IReserveItem {
  label: string;
  currency: TCurrency;
  amount: number;
}

export interface IReserveState {
  items: IReserveItem[];
}

export interface IReserveActions {
  updateAmount: (currency: TCurrency, amount: number) => void;
  reset: () => void;
}

export type IReserveStore = IReserveState & IReserveActions;

export const defaultInitState: IReserveState = {
  items: [
    { label: 'TWD', currency: 'TWD', amount: 10000 },
    { label: 'USD', currency: 'USD', amount: 1000 },
    // { label: 'EUR', currency: 'EUR', amount: 500 },
  ],
};

const reserveSlice = (set: any): IReserveStore => ({
  ...defaultInitState,
  updateAmount: (currency: TCurrency, amount: number) => {
    set((state: IReserveState) => ({
      items: state.items.map((item) =>
        item.currency === currency ? { ...item, amount } : item
      ),
    }));
  },
  reset: () => {
    set(defaultInitState);
  },
});

export const useReserveStore = create<IReserveStore & IPersistStore>()(
  persist(
    (set, get) => ({
      persistLoading: true,
      setPersistLoading: (loading: boolean) => {
        set({ persistLoading: loading });
      },
      ...reserveSlice(set),
    }),
    {
      name: 'reserve-store',
      onRehydrateStorage: () => (state) => {
        state?.setPersistLoading(false);
      },
    }
  )
);

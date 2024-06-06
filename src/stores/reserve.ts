import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TCurrency = 'TWD' | 'USD' | 'EUR';
export interface TReserveItem {
  label: string;
  currency: TCurrency;
  amount: number;
}

export interface IReserveState {
  items: TReserveItem[];
}

export interface IReserveActions {
  updateAmount: (currency: TCurrency, amount: number) => void;
  reset: () => void;
}

export type IReserveStore = IReserveState & IReserveActions;

export const defaultInitState: IReserveState = {
  items: [
    { label: '台幣', currency: 'TWD', amount: 10000 },
    { label: '美金', currency: 'USD', amount: 1000 },
    // { label: '歐元', currency: 'EUR', amount: 500 },
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

interface IPersistStore {
  persistLoading: boolean;
  setPersistLoading: (loading: boolean) => void;
}
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

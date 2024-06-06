import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type IPersistStore } from '.';

export type TExchangeLogStatus = 'success' | 'fail';

export interface IReverseLogItem {
  id: string;
  from: string;
  fromAmount: number;
  currentFromAmount: number;
  to: string;
  toAmount: number;
  currentToAmount: number;
  status: TExchangeLogStatus;
  createdAt: string;
}

export interface IReserveLogState {
  logs: IReverseLogItem[];
}

export interface IReserveLogActions {
  addLog: (log: IReverseLogItem) => void;
  reset: () => void;
}

export type IReserveLogStore = IReserveLogState & IReserveLogActions;

export const defaultInitState: IReserveLogState = {
  logs: [],
};

export const reserveLogSlice = (set: any): IReserveLogStore => ({
  ...defaultInitState,
  addLog: (log: IReverseLogItem) => {
    set((state: IReserveLogState) => ({
      logs: [log, ...state.logs],
    }));
  },
  reset: () => {
    set(defaultInitState);
  },
});

export const useReserveLogStore = create<IReserveLogStore & IPersistStore>()(
  persist(
    (set, get) => ({
      persistLoading: true,
      setPersistLoading: (loading: boolean) => {
        set({ persistLoading: loading });
      },
      ...reserveLogSlice(set),
    }),
    {
      name: 'reserve-log-store',
      onRehydrateStorage: () => (state) => {
        state?.setPersistLoading(false);
      },
    }
  )
);

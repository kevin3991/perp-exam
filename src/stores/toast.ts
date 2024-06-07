import { create } from 'zustand';

interface ToastStore {
  ref: any;
  setRef: (ref: any) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  ref: null,
  setRef: (ref: any) => {
    set((state) => {
      if (state.ref !== null) {
        return state;
      }

      return {
        ref,
      };
    });
  },
}));

import { useToastStore } from '@/stores/toast';

interface IUseToast {
  show: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

export function useToast(): IUseToast {
  const toastStore = useToastStore();

  return {
    show: (message: string) => {
      toastStore.ref.show({
        severity: 'success',
        summary: 'Success',
        detail: message,
      });
    },
    error: (message: string) => {
      toastStore.ref.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    },
    warning: (message: string) => {
      toastStore.ref.show({
        severity: 'warn',
        summary: 'Warning',
        detail: message,
      });
    },
  };
}

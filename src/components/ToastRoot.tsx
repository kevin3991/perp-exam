'use client';

import { Toast } from 'primereact/toast';
import { useToastStore } from '@/stores/toast';
import { useCallback } from 'react';

const ToastRoot = (): JSX.Element => {
  const toastStore = useToastStore();

  const toastRef = useCallback(
    (r: any) => {
      if (toastStore.ref !== null) return;
      toastStore.setRef(r);
    },
    [toastStore]
  );

  return <Toast ref={toastRef} />;
};

export default ToastRoot;

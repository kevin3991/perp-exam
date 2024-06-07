import { Dialog } from 'primereact/dialog';
import CForm, { type TFormInput } from '../common/CForm';
import { useForm } from '@/hooks/useForm';
import { type TCurrency, useReserveStore } from '@/stores/reserve';
import { useCallback, useEffect, useMemo } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useToast } from '@/hooks/useToast';
import { useReserveLogStore } from '@/stores/reserveLog';

interface IEditReserveDialog {
  visible: boolean;
  onHide: () => void;
}
type FormState = Record<TCurrency, number>;

const EditReserveDialog = (props: IEditReserveDialog): JSX.Element => {
  const { visible, onHide } = props;

  const toastHook = useToast();
  const { items, updateAmount } = useReserveStore();
  const { reset: resetLog } = useReserveLogStore();
  const { form, setForm, onChange } = useForm<FormState>();

  const inputs = useMemo(() => {
    return items.map((item): TFormInput => {
      return {
        name: item.currency,
        label: item.label,
        colSpan: 6,
        component: 'Number',
        min: 0,
      };
    });
  }, [items]);

  const cloneItemsData2Form = useCallback((): void => {
    setForm(
      items.reduce<any>((acc, item) => {
        acc[item.currency] = item.amount;
        return acc;
      }, {})
    );
  }, [items, setForm]);
  const onCancel = (): void => {
    onHide();
    cloneItemsData2Form();
  };
  const noPassValidation = (): boolean => {
    const notAllowZero = !Object.keys(form).every((currency) => {
      return form[currency as TCurrency] >= 0;
    });

    if (notAllowZero) {
      toastHook.warning('Amount should be greater than or equal to 0');
      return true;
    }

    const nothingChanged = Object.keys(form).every((currency) => {
      return (
        form[currency as TCurrency] ===
        items.find((item) => item.currency === currency)?.amount
      );
    });
    if (nothingChanged) {
      toastHook.warning('Nothing changed');
      return true;
    }

    return false;
  };
  const onSubmit = async (): Promise<void> => {
    if (noPassValidation()) {
      return;
    }

    confirmDialog({
      message: () => {
        return (
          <div>
            <p>Are you sure you want to change the reserves?</p>
            <p>System will remove all the history and reset.</p>
          </div>
        );
      },
      header: 'Update Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        Object.keys(form).forEach((currency: string) => {
          updateAmount(
            currency as TCurrency,
            Number(form[currency as TCurrency])
          );
        });
        onHide();
        resetLog();
        toastHook.show('Update success!');
      },
    });
  };

  useEffect(() => {
    cloneItemsData2Form();
  }, [cloneItemsData2Form]);

  return (
    <Dialog
      header="Edit Reserves"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        onHide();
      }}
    >
      <CForm
        form={form}
        inputs={inputs}
        className="mt-2"
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default EditReserveDialog;

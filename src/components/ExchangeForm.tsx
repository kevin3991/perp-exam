import { useForm } from '@/hooks/useForm';
import CForm, { type TFormInput } from './common/CForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useExchange } from '@/hooks/useExchange';
import { type TCurrency } from '@/stores/reserve';
import { Fieldset } from 'primereact/fieldset';
import Info from './Info';
import { useToast } from '@/hooks/useToast';
import { confirmDialog } from 'primereact/confirmdialog';
import { formatNumberWithCommas } from '@/utils/common';
import { Message } from 'primereact/message';

interface IExchangeFormProps {
  className?: string;
}

const ExchangeForm = (props: IExchangeFormProps): JSX.Element => {
  const { className } = props;

  const toastHook = useToast();
  const { exchangeOptions, getFromAndTo, exchange } = useExchange();
  const { form, setForm, onChange } = useForm<{
    exchangeTo: string;
    amount: number;
  }>({
    form: {
      exchangeTo: '',
      amount: 0,
    },
  });

  const [currency, setCurrency] = useState<TCurrency>();

  const inputs = useMemo((): TFormInput[] => {
    return [
      {
        name: 'exchangeTo',
        label: () => {
          return (
            <span className="inline-flex items-center">
              <span>Exchange to</span>
              <Info>Select the currency you want to exchange to.</Info>
            </span>
          );
        },
        colSpan: 6,
        component: 'Select',
        required: true,
        options: exchangeOptions,
      },
      {
        name: 'amount',
        label: () => {
          return (
            <span className="inline-flex items-center">
              <span>Amount</span>
              <Info>Enter the amount you want to exchange.</Info>
            </span>
          );
        },
        colSpan: 6,
        min: 1,
        component: 'Number',
        disabled: currency === undefined,
        currency,
        required: true,
      },
    ];
  }, [exchangeOptions, currency]);
  const onSubmit = async (): Promise<void> => {
    if (noPassValidation()) {
      return;
    }

    confirmDialog({
      message: () => {
        const text = `${formatNumberWithCommas(Number(form.amount))} ${
          form.exchangeTo
        }`;
        return (
          <div>
            <p className="text-[18px] font-bold mb-2">
              Do you want to exchange?
            </p>
            <Message severity="info" text={text} className="mt-2" />
          </div>
        );
      },
      header: 'Exchange Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-primary',
      accept: () => {
        const [from, to] = getFromAndTo(form.exchangeTo as TCurrency);
        exchange(from, to, Number(form.amount));
        toastHook.show('Exchange success!');
      },
    });
  };
  const noPassValidation = (): boolean => {
    if (form.exchangeTo === '') {
      toastHook.warning('Please select a currency to exchange to.');
      return true;
    }
    if (form.amount <= 0) {
      toastHook.warning('The amount must bigger than 0.');
      return true;
    }
    return false;
  };
  const handleMode = useCallback(() => {
    if (form.exchangeTo === '') {
      setCurrency(undefined);
      return;
    }

    const [from] = getFromAndTo(form.exchangeTo as TCurrency);
    setCurrency(from);
  }, [form.exchangeTo, getFromAndTo]);
  const onCancel = useCallback(() => {
    setForm({
      exchangeTo: '',
      amount: 0,
    });
  }, [setForm]);

  useEffect(() => {
    handleMode();
  }, [form.exchangeTo, handleMode]);

  return (
    <Fieldset legend="Trade" toggleable collapsed className={className}>
      <CForm
        form={form}
        inputs={inputs}
        className="mt-2"
        cancelText="Clear"
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Fieldset>
  );
};

export default ExchangeForm;

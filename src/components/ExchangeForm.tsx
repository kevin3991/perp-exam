import { useForm } from '@/hooks/useForm';
import CForm, { type TFormInput } from './common/CForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useExchange } from '@/hooks/useExchange';
import { type TCurrency } from '@/stores/reserve';
import { Fieldset } from 'primereact/fieldset';
import Info from './Info';

interface IExchangeFormProps {
  className?: string;
}

const ExchangeForm = (props: IExchangeFormProps): JSX.Element => {
  const { className } = props;

  const { exchangeOptions, getFromAndTo, exchange } = useExchange();
  const { form, setForm, onChange } = useForm({
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
    const [from, to] = getFromAndTo(form.exchangeTo as TCurrency);
    exchange(from, to, Number(form.amount));
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

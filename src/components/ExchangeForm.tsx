import { useForm } from '@/hooks/useForm';
import CForm, { type TFormInput } from './common/CForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useExchange } from '@/hooks/useExchange';
import { type TCurrency } from '@/stores/reserve';
import { Fieldset } from 'primereact/fieldset';

interface IExchangeFormProps {
  className?: string;
}

const ExchangeForm = (props: IExchangeFormProps): JSX.Element => {
  const { className } = props;

  const { exchangeOptions, getFromAndTo, exchange } = useExchange();
  const { form, setForm, onChange } = useForm({
    form: {
      exchangeTo: '',
      amount: 1,
    },
  });

  const [currency, setCurrency] = useState<TCurrency>();

  const inputs = useMemo((): TFormInput[] => {
    return [
      {
        name: 'exchangeTo',
        label: 'Exchange to',
        colSpan: 6,
        component: 'Select',
        required: true,
        options: exchangeOptions,
      },
      {
        name: 'amount',
        label: 'Amount',
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
    if (form.exchangeTo === '') return;

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

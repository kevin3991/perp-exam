import { type NormalValue } from '@/components/common/CForm';
import { useCallback, useState } from 'react';

interface IUseFormProps {
  form?: Record<string, any>;
}
type TForm<T> = Record<string, any> | T;

export function useForm<T>(props?: IUseFormProps): {
  form: TForm<T>;
  setForm: any;
  onChange: (args: { name: string; value: NormalValue }) => void;
} {
  const { form } = props ?? {};

  // TODO: Use store
  const [innerForm, setInnerForm] = useState<TForm<T>>(form ?? {});

  const onChange = useCallback(
    ({ name, value }: { name: string; value: NormalValue }): void => {
      setInnerForm((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  return {
    form: innerForm,
    setForm: setInnerForm,
    onChange,
  };
}

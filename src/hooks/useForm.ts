import { type NormalValue } from '@/components/common/CForm';
import { useCallback, useState } from 'react';

interface IUseFormProps {
  form: Record<string, any>;
}

export function useForm(props: IUseFormProps): any {
  const { form } = props;

  // TODO: Use store
  const [innerForm, setInnerForm] = useState(form);

  const onChange = useCallback(
    ({ name, value }: { name: string; value: NormalValue }): void => {
      setInnerForm((prev) => {
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

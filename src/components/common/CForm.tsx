import { useMemo, useCallback, type FormEvent, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CSelect from './CSelect';
import CurrencyInput from 'react-currency-input-field';

export interface TFormInput {
  name: string;
  label?: string | (() => JSX.Element);
  placeholder?: string;
  required?: boolean;
  component?: 'Select' | 'Text' | 'Number';
  colSpan?: number;
  currency?: any;
  min?: number;
  disabled?: boolean;
  componentProps?: Record<string, any>;
  render?: (data: any) => JSX.Element;
  options?: Array<{ label: string; value: string | number | boolean }>;
}

// type DateValue = Date | Array<Date | null> | Date[] | null | undefined;
export type NormalValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | File;
export type NormalForm = Record<string, NormalValue>;
export interface FormProps {
  form: NormalForm;
  inputs: TFormInput[];
  submitText?: string;
  removeText?: string;
  cancelText?: string;
  className?: string;
  onChange?: (form: { name: string; value: NormalValue }) => void;
  onSubmit?: (form: NormalForm) => Promise<void>;
  onRemove?: () => void;
  onCancel?: () => void;
}

export default function CForm(props: FormProps): JSX.Element {
  const { onChange, onSubmit, onRemove, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const submitT = useMemo(
    () => props.submitText ?? 'Submit',
    [props.submitText]
  );
  const cancelT = useMemo(
    () => props.cancelText ?? 'Cancel',
    [props.cancelText]
  );
  const removeT = useMemo(
    () => props.removeText ?? 'Delete',
    [props.removeText]
  );
  const formMainClassName = useMemo(
    () => (props.className ?? '') + ' flex flex-col gap-4',
    [props.className]
  );

  const updateForm = useCallback(
    (name: string, value: NormalValue) => {
      if (onChange !== undefined) {
        onChange({ name, value });
      }
    },
    [onChange]
  );
  const getComponent = useCallback(
    (input: TFormInput, form: FormProps['form']) => {
      if (input.render !== undefined) {
        return input.render(form);
      }
      switch (input.component) {
        case 'Text':
          return <div>{form[input.name] as string}</div>;
        case 'Select':
          return (
            <CSelect
              value={form[input.name] as string}
              onChange={(e) => {
                updateForm(input.name, e.value as NormalValue);
              }}
              required={input.required}
              disabled={input.disabled}
              options={input.options ?? []}
              placeholder="Select"
              className="w-full p-inputtext-sm"
            />
          );
        case 'Number':
          return (
            <CurrencyInput
              value={form[input.name] as number}
              decimalsLimit={2}
              placeholder={input.placeholder}
              disabled={input.disabled}
              required={input.required}
              intlConfig={{ locale: 'en-US', currency: input.currency }}
              className="p-inputnumber-input p-inputtext p-component w-full"
              onValueChange={(value, name, values) => {
                updateForm(input.name, value);
              }}
            />
          );
        default:
          return (
            <InputText
              // name={input.name}
              value={form[input.name] as string}
              placeholder={input.placeholder}
              disabled={input.disabled}
              required={input.required}
              className="w-full p-inputtext-sm"
              onChange={(e) => {
                updateForm(input.name, e.target.value);
              }}
              {...input.componentProps}
            />
          );
      }
    },
    [updateForm]
  );
  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (onSubmit !== undefined) {
        setIsLoading(true);
        await onSubmit(props.form);
        setIsLoading(false);
      }
    },
    [onSubmit, props.form]
  );
  const getLabel = useCallback((input: TFormInput) => {
    if (typeof input.label === 'function') {
      return input.label();
    }
    return input.label ?? input.name;
  }, []);

  return (
    <form className={formMainClassName} onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-12 gap-4">
        {props.inputs?.map((input, index) => {
          return (
            <div
              key={input.name}
              className={`col-span-12 md:col-span-${input?.colSpan ?? 12}`}
            >
              <label htmlFor={input.name} className="font-bold block mb-2">
                {(input?.required ?? false) && (
                  <span className="mr-1 text-red-400">*</span>
                )}
                {getLabel(input)}
              </label>
              {getComponent(input, props.form)}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-4 mt-2">
        {onRemove !== undefined && (
          <Button
            type="button"
            severity="danger"
            size="small"
            onClick={() => {
              onRemove();
            }}
          >
            {removeT}
          </Button>
        )}
        {onCancel !== undefined && (
          <Button
            type="button"
            severity="secondary"
            size="small"
            onClick={() => {
              onCancel();
            }}
          >
            {cancelT}
          </Button>
        )}
        {onSubmit !== undefined && (
          <Button severity="success" loading={isLoading} size="small">
            {submitT}
          </Button>
        )}
      </div>
    </form>
  );
}

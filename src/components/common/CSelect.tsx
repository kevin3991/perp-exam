import { Dropdown } from 'primereact/dropdown';

interface ICSelectProps {
  value: any;
  onChange: (e: any) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  options?: Array<{ label: string; value: string | number | boolean }>;
}

export default function CSelect(props: ICSelectProps): JSX.Element {
  const { required, value } = props;
  return (
    <div className="flex relative">
      <input
        required={required}
        value={value}
        className="opacity-0 absolute left-0 bottom-0"
      />
      <Dropdown
        value={value}
        onChange={(e) => {
          props.onChange(e);
        }}
        required={required}
        disabled={props.disabled}
        options={props.options ?? []}
        placeholder={props?.placeholder ?? '請選擇'}
        className={props?.className}
      />
    </div>
  );
}

import { useExchange } from '@/hooks/useExchange';
import { formatNumberWithCommas } from '@/utils/common';
import { Fieldset } from 'primereact/fieldset';
import EditReserveDialog from './dialog/EditReserveDialog';
import { useDialog } from '@/hooks/useDialog';

const ReverseInfo = (): JSX.Element => {
  const { items } = useExchange();
  const { isOpen, onOpen, onHide } = useDialog();

  return (
    <Fieldset legend="Reserves" className="relative">
      <i
        className="pi pi-pencil text-[#f0ad4e] text-lg absolute top-0 right-2 -translate-y-[1rem]
       transition-all duration-300 cursor-pointer hover:text-[#c3985b]"
        onClick={onOpen}
      ></i>
      <p className="font-bold mb-2">Current reserves in the exchange module:</p>
      {items.map((item) => (
        <p key={item.currency}>
          {item.label}：{formatNumberWithCommas(Number(item.amount))}
        </p>
      ))}
      <EditReserveDialog visible={isOpen} onHide={onHide} />
    </Fieldset>
  );
};

export default ReverseInfo;

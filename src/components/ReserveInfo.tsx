import { useExchange } from '@/hooks/useExchange';
import { formatNumberWithCommas } from '@/utils/common';
import { Fieldset } from 'primereact/fieldset';

const ReverseInfo = (): JSX.Element => {
  const { items } = useExchange();

  return (
    <Fieldset legend="Reserves">
      <p className="font-bold mb-2">Current reserves in the exchange module:</p>
      {items.map((item) => (
        <p key={item.currency}>
          {item.label}：{formatNumberWithCommas(Number(item.amount))}
        </p>
      ))}
    </Fieldset>
  );
};

export default ReverseInfo;

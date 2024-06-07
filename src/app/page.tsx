'use client';

import ExchangeForm from '@/components/ExchangeForm';
import LogTable from '@/components/LogTable';
import { useExchange } from '@/hooks/useExchange';
import { formatNumberWithCommas } from '@/utils/common';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';

export default function Home(): JSX.Element {
  const { items, persistLoading, reset } = useExchange();

  if (persistLoading) {
    return <div className="flex justify-center pt-[200px]">Loading...</div>;
  }

  return (
    <div className="flex justify-center pt-[200px] pb-[60px]">
      <div className="max-w-[600px] w-[80vw] gap-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[32px] font-bold">Exchange module</h1>
          <Button
            severity="danger"
            label="Reset"
            size="small"
            onClick={reset}
          />
        </div>
        <Fieldset legend="Reserves">
          {items.map((item) => (
            <p key={item.currency}>
              {item.label}：{formatNumberWithCommas(Number(item.amount))}
            </p>
          ))}
        </Fieldset>
        <ExchangeForm />
        <LogTable />
      </div>
    </div>
  );
}

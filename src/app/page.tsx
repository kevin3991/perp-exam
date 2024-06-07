'use client';

import ExchangeForm from '@/components/ExchangeForm';
import LogTable from '@/components/LogTable';
import ReverseInfo from '@/components/ReserveInfo';
import { useExchange } from '@/hooks/useExchange';
import { Button } from 'primereact/button';

export default function Home(): JSX.Element {
  const { persistLoading, reset } = useExchange();

  if (persistLoading) {
    return <div className="flex justify-center pt-[200px]">Loading...</div>;
  }

  return (
    <div className="flex justify-center py-[60px]">
      <div className="max-w-[640px] w-[80vw] gap-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[32px] font-bold">Exchange module</h1>
          <Button
            severity="danger"
            label="Reset"
            size="small"
            onClick={reset}
          />
        </div>
        <ReverseInfo />
        <ExchangeForm />
        <LogTable />
      </div>
    </div>
  );
}

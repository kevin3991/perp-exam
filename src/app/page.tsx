'use client';

import ExchangeForm from '@/components/ExchangeForm';
import Footer from '@/components/Footer';
import LogTable from '@/components/LogTable';
import ReverseInfo from '@/components/ReserveInfo';
import { useExchange } from '@/hooks/useExchange';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

export default function Home(): JSX.Element {
  const { persistLoading, reset } = useExchange();

  return (
    <>
      <div className="flex justify-center py-[30px] pb-[80px] md:pb-[120px] md:pt-[60px]">
        <div className="max-w-[640px] w-full gap-4 flex flex-col px-4">
          {persistLoading ? (
            <Loading />
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[24px] font-bold md:text-[32px]">
                  Exchange module
                </h1>
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

const Loading = (): JSX.Element => {
  return (
    <div className="">
      <Skeleton className="mb-2"></Skeleton>
      <Skeleton width="10rem" className="mb-2"></Skeleton>
      <Skeleton width="5rem" className="mb-2"></Skeleton>
      <Skeleton height="2rem" className="mb-2"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </div>
  );
};

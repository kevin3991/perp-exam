'use client';

import ExchangeForm from '@/components/ExchangeForm';
import Footer from '@/components/Footer';
import LogTable from '@/components/LogTable';
import ReverseInfo from '@/components/ReserveInfo';
import { useExchange } from '@/hooks/useExchange';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { useRef } from 'react';

export default function Home(): JSX.Element {
  const { persistLoading, reset } = useExchange();

  const sourceRef = useRef<any>(null);

  const onReset = (): void => {
    confirmDialog({
      message: () => {
        return (
          <div>
            <p className="text-[18px] font-bold mb-2">Do you want to reset?</p>
            <p>
              System will remove all the history and reset the reserve to 10,000
              TWD and 1,000 USD.
            </p>
          </div>
        );
      },
      header: 'Reset Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        reset();
      },
    });
  };

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
                  onClick={onReset}
                />
              </div>
              <div className="flex items-center">
                <a
                  href="https://medium.com/bollinger-investment-group/constant-function-market-makers-defis-zero-to-one-innovation-968f77022159"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center transition-all duration-300 hover:opacity-70"
                  ref={sourceRef}
                >
                  <Tag value="source" />
                </a>
                <Tooltip target={sourceRef}>
                  (Rt + x) * (Ru + y) = Rt * Ru
                </Tooltip>
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

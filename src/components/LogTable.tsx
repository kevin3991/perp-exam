import { useReserveLogStore } from '@/stores/reserveLog';
import { useMemo } from 'react';
import CTable from './common/CTable';
import dayjs from 'dayjs';
import { formatNumberWithCommas } from '@/utils/common';
import Info from './Info';
import { Fieldset } from 'primereact/fieldset';

interface ILogTableProps {
  className?: string;
}

const LogTable = (props: ILogTableProps): JSX.Element => {
  const { className } = props;

  const { logs } = useReserveLogStore();

  const columns = useMemo(() => {
    return [
      {
        field: 'createdAt',
        header: 'Exchange at',
        body: (rowData: any) => {
          return (
            <div>
              {dayjs(rowData.createdAt as string).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          );
        },
      },
      {
        field: 'from',
        header: 'Action',
        body: (rowData: any) => {
          const {
            fromAmount,
            from,
            toAmount,
            to,
            currentFromAmount,
            currentToAmount,
          } = rowData;
          return (
            <div>
              <Price price={fromAmount} currency={from} />
              <i
                className="pi pi-arrow-right m-2"
                style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}
              />
              <Price price={toAmount} currency={to} />
              <Info>
                <div>
                  <div>
                    <span>{from}:</span>
                    <span className="ml-1">
                      {formatNumberWithCommas(Number(currentFromAmount))}
                    </span>
                  </div>
                  <div>
                    <span>{to}:</span>
                    <span className="ml-1">
                      {formatNumberWithCommas(Number(currentToAmount))}
                    </span>
                  </div>
                </div>
              </Info>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Fieldset legend="History" className={className}>
      <CTable data={logs} columns={columns} />
    </Fieldset>
  );
};

const Price = (props: { price: number; currency: string }): JSX.Element => {
  return (
    <span>
      {formatNumberWithCommas(Number(props.price))}
      <span className="ml-1">{props.currency}</span>
    </span>
  );
};

export default LogTable;

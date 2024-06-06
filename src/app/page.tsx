'use client';

import { useExchange } from '@/hooks/useExchange';
import { type TCurrency } from '@/stores/reserve';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const { items, exchangeOptions, getFromAndTo, exchange, persistLoading } =
    useExchange();

  const [value, setValue] = useState(0);
  const [exchangeTo, setExchangeTo] = useState<string>('');

  const handleExchange = (e: any): void => {
    e.preventDefault();
    console.log('handleExchange', value, exchangeTo);
    const [from, to] = getFromAndTo(exchangeTo);
    // console.log('from, to', from, to);
    const result = exchange(from, to, value);
    console.log('result', result);
  };

  if (persistLoading) {
    return <div className="flex justify-center pt-[200px]">Loading...</div>;
  }

  return (
    <div className="flex justify-center pt-[200px]">
      <div>
        <h1>Exchange</h1>
        {items.map((item) => (
          <p key={item.currency}>
            {item.label}：{item.amount}
          </p>
        ))}
        <form onSubmit={handleExchange}>
          <label>換成</label>
          <Dropdown
            value={exchangeTo}
            options={exchangeOptions}
            onChange={(e) => {
              setExchangeTo(e.value as TCurrency);
            }}
          />
          <label>輸入金額</label>
          <InputText
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
          />
          <Button label="Click" />
        </form>
      </div>
    </div>
  );
}

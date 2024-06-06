'use client';

import { getUuid } from '@/utils/common';
import { Tooltip } from 'primereact/tooltip';
import { useRef } from 'react';

interface IInfoProps {
  children: React.ReactNode;
}

const Info = (props: IInfoProps): JSX.Element => {
  const uuid = useRef(getUuid());
  return (
    <span>
      <i
        id={uuid.current}
        className="pi pi-info-circle ml-2 cursor-pointer text-[var(--primary-color)]"
      />
      <Tooltip target={`#${uuid.current}`}>{props.children}</Tooltip>
    </span>
  );
};

export default Info;

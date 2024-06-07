'use client';

import { getUuid } from '@/utils/common';
import { Tooltip } from 'primereact/tooltip';
import { useRef } from 'react';

interface IInfoProps {
  children: React.ReactNode;
}

const Info = (props: IInfoProps): JSX.Element => {
  const uuid = useRef(getUuid());
  const iconRef = useRef<HTMLSpanElement>(null);

  return (
    <span>
      <i
        ref={iconRef}
        className={`pi pi-info-circle ml-2 cursor-pointer text-[var(--primary-color)] ${uuid.current}`}
      />
      <Tooltip target={iconRef}>{props.children}</Tooltip>
    </span>
  );
};

export default Info;

import { useState } from 'react';

interface IUseDialog {
  isOpen: boolean;
  onOpen: () => void;
  onHide: () => void;
}

export const useDialog = (): IUseDialog => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (): void => {
    setIsOpen(true);
  };
  const onHide = (): void => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onHide,
  };
};

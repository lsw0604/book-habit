import { useState, useEffect, RefObject, MutableRefObject } from 'react';

interface IProps {
  target: MutableRefObject<HTMLDivElement>;
}

export default function useOutsideClick({ target }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (target.current && !target.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, handleClickOutside };
}

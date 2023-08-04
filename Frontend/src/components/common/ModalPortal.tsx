import styled from 'styled-components';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalAtom } from 'recoil/modal';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalPortal = ({ children }: IProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>();
  const modalState = useRecoilValue(modalAtom);
  const setModalState = useSetRecoilState(modalAtom);

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById('root-modal');
    if (dom) {
      ref.current = dom;
    }
  }, []);

  const onModalClose = () => {
    setModalState({ isOpen: false, isbn: '', title: '' });
  };

  if (ref.current && mounted && modalState.isOpen) {
    return createPortal(
      <Container role="presentation">
        <Background onClick={onModalClose} />
        <AnimatePresence>{children}</AnimatePresence>
      </Container>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;

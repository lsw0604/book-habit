import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';

import { toastAtom } from 'recoil/toast';
import Icon from 'components/common/Button/Icon';
import { IconX } from '@style/icons';

interface IProps {
  toasts: {
    id: number;
    message: string;
    type: 'failure' | 'info' | 'success' | 'warning' | '';
  }[];
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  padding: 0 0.5rem;
  z-index: 9999;
`;

const Toaster = styled.div`
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 0.5;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div``;

const Message = styled.span``;

export default function ToastList({ toasts }: IProps) {
  const toastRef = document.querySelector('#toast');

  const toastSetState = useSetRecoilState(toastAtom);

  if (!toastRef) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        toastSetState((prev) =>
          prev.filter((toast) => toast.id !== toasts[0].id)
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [toasts]);

  return createPortal(
    <Container>
      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0.5, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.5, y: 12 }}
          transition={{ ease: 'easeInOut' }}
        >
          {toasts.map((toast) => (
            <>
              <Toaster key={toast.id}>
                <Info>{toast.type}</Info>
                <Message>{toast.message}</Message>
                <Icon icon={<IconX />}>closeX</Icon>
              </Toaster>
            </>
          ))}
        </motion.div>
      </AnimatePresence>
    </Container>,
    toastRef
  );
}

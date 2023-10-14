import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/common/Button/Icon';
import {
  IconError,
  IconInfo,
  IconSuccess,
  IconWarning,
  IconClose,
} from '@style/icons';
import useToastHook from '@hooks/useToastHook';

const icons = {
  success: <IconSuccess />,
  error: <IconError />,
  warning: <IconWarning />,
  info: <IconInfo />,
};

const Container = styled(motion.div)`
  width: 100%;
  position: fixed;
  margin-top: 10px;
  top: 1rem;
  height: auto;
  z-index: 9999;
  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Item = styled(motion.div)`
  width: 100%;
  padding: 0.5rem 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xxl};
  @media screen and (min-width: 1280px) {
    width: 40%;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
`;

const IconWrapper = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.colors.main};
  }
`;

export default function Toast() {
  const { toastState, deleteToast } = useToastHook();

  const toastVariants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container>
      <AnimatePresence>
        {toastState &&
          toastState.map((toast) => (
            <Item
              key={toast.id}
              variants={toastVariants}
              initial="initial"
              exit="exit"
              animate="animate"
            >
              {toast.status !== '' && (
                <IconWrapper>{icons[toast.status]}</IconWrapper>
              )}
              <Span>{toast.message}</Span>
              <Icon
                mode="text"
                onClick={() => deleteToast({ id: toast.id })}
                icon={<IconClose />}
              >
                Icon_btn
              </Icon>
            </Item>
          ))}
      </AnimatePresence>
    </Container>
  );
}

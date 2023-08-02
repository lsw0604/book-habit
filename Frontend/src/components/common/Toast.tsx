import styled from 'styled-components';
import Icon from './Button/Icon';
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

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: auto;
`;

const Item = styled.div`
  margin: 0 2rem;
  padding: 0.5rem 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xxl};
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
  return (
    <Container>
      {toastState &&
        toastState.map((toast) => (
          <Item key={toast.id}>
            {toast.status !== '' && (
              <IconWrapper>{icons[toast.status]}</IconWrapper>
            )}
            <Span>{toast.message}</Span>
            <Icon
              text
              onClick={() => deleteToast({ id: toast.id })}
              icon={<IconClose />}
            >
              Icon_btn
            </Icon>
          </Item>
        ))}
    </Container>
  );
}

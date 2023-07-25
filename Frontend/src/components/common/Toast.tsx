import styled from 'styled-components';
import Icon from './Button/Icon';
import { IconX } from '@style/icons';
import useToastHook from '@hooks/useToastHook';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
`;

const Item = styled.div`
  padding: 0 2rem;
`;

const Span = styled.span``;

const IconWrapper = styled.div``;

export default function Toast() {
  const { toastState, deleteToast } = useToastHook();
  return (
    <Container>
      {toastState &&
        toastState.map((toast) => (
          <Item key={toast.id}>
            <IconWrapper>{}</IconWrapper>
            <Span>{toast.message}</Span>
            <Icon
              onClick={() => deleteToast({ id: toast.id })}
              icon={<IconX />}
            >
              Icon_btn
            </Icon>
          </Item>
        ))}
    </Container>
  );
}

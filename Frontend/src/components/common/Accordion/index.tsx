import styled from 'styled-components';
import { ReactNode, useState } from 'react';
import { IconDownArrow, IconUpArrow } from '@style/icons';

interface IProps {
  children: ReactNode;
  label?: string;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const Icon = styled.div`
  width: 1rem;
  svg {
    width: 1rem;
  }
`;

export default function Index({ children, label }: IProps) {
  const [open, isOpen] = useState<boolean>(false);

  const onOpenHandler = () => {
    isOpen((prev) => !prev);
  };
  return (
    <>
      <Container onClick={onOpenHandler}>
        <div>{label}</div>
        <Icon>{open ? <IconUpArrow /> : <IconDownArrow />}</Icon>
      </Container>
      {open ? children : null}
    </>
  );
}

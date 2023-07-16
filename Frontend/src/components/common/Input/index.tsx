import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Container = styled.div``;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.mode.sub};
`;

export default function Index({ label, ...props }: IProps) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input {...props} />
    </Container>
  );
}

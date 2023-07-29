import styled from 'styled-components';

import { IconX, IconCheck } from '@style/icons';
import { customize } from '@style/colors';

interface IProps {
  isValid: boolean;
  errorMessage: string;
}

const Container = styled.p<{ isValid: boolean }>`
  margin-top: 10px;
  color: ${({ isValid }) =>
    isValid ? customize.red['300'] : customize.lime['300']};
  align-items: center;
  line-height: 1.5rem;
  font-size: 1rem;
  svg {
    align-items: center;
    margin-right: 8px;
    fill: ${({ isValid }) =>
      isValid ? customize.red['300'] : customize.lime['300']};
    height: 1.2rem;
    width: 1.2rem;
  }
`;

export default function ValidationMessage({ isValid, errorMessage }: IProps) {
  return (
    <>
      <Container isValid={isValid}>
        {isValid ? <IconX /> : <IconCheck />}
        {errorMessage}
      </Container>
    </>
  );
}

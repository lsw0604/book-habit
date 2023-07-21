import { customize } from '@style/colors';
import styled, { css } from 'styled-components';
import { InputHTMLAttributes, memo } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  label?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Container = styled.div<{ icon: boolean }>`
  width: 100%;
  display: flex;
  height: 40px;
  input {
    position: relative;
    background-color: ${({ theme }) => theme.mode.main};
    width: 100%;
    height: auto;
    padding: ${({ icon }) => (icon ? '0 44px 0 11px' : '0 11px')};
    border: 2px solid ${({ theme }) => theme.mode.typo_sub};
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.mode.typo_sub};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  input:-webkit-autofill:hover {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;

const Label = styled.label`
  span {
    margin-left: 10px;
    margin-bottom: 8px;
    display: block;
    color: ${({ theme }) => theme.mode.typo_sub};
    font-size: 14px;
    line-height: 18px;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 0px;
  top: 10px;
  right: 32px;
  svg {
    height: 1rem;
    width: 1rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${customize.red['300']};
  margin-left: 10px;
`;

const Index = ({
  icon,
  label,
  isValid,
  useValidation,
  errorMessage,
  ...props
}: IProps) => {
  return (
    <>
      <Label>
        <span>{label}</span>
      </Label>
      <Container icon={!!icon}>
        <input {...props} />
        <Icon>{icon}</Icon>
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};

const Input = memo(Index);

export default Input;

import { customize } from '@style/colors';
import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  label?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Container = styled.div`
  display: flex;
`;

const Label = styled.label`
  margin-left: 8px;
  margin-bottom: 8px;
  span {
    display: block;
    color: ${({ theme }) => theme.mode.typo_main};
    font-size: 14px;
    line-height: 18px;
  }
`;

const Input = styled.input<{ icon: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.mode.main};
  width: 100%;
  height: 46px;
  padding: ${({ icon }) => (icon ? '0 44px 0 11px' : '0 11px')};
  border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  &:focus {
    border-color: ${customize.sky['300']};
  }
`;

const Icon = styled.div`
  position: relative;
  width: 0px;
  top: 8px;
  right: 38px;
  svg {
    height: 30px;
    fill: ${({ theme }) => theme.mode.typo_sub};
    &:focus-within {
      fill: ${customize.sky['300']};
    }
  }
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
      <Container>
        <Input {...props} icon={!!icon} />
        <Icon>{icon}</Icon>
      </Container>
    </>
  );
};

export default Index;

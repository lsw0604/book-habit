import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import ErrorMessage from 'components/common/Message/ErrorMessage';
import { customize } from '@style/colors';
import { IconDownArrow } from '@style/icons';

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

const Label = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.mode.sub};
  border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 5px;
  font-size: 1rem;
  padding: 0 1rem;
  color: ${({ theme }) => theme.mode.typo_sub};
  outline: none;
  -webkit-appearance: none;
  &:focus {
    border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  }
  &:disabled {
    color: ${customize.gray['400']};
    background-color: ${customize.gray['400']};
    cursor: not-allowed;
  }
`;

const Option = styled.option`
  width: auto;
  height: auto;
  overflow: hidden;
  padding: 0 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled.i`
  width: 0;
  height: 0;
  position: relative;
  top: 4px;
  right: 36px;
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

interface IProps<T extends number | string>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: T[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  disabledOptions?: T[];
}

export default function Selector<T extends string | number>({
  label,
  options,
  isValid,
  useValidation,
  errorMessage,
  disabledOptions,
  ...props
}: IProps<T>) {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container>
        <Select {...props}>
          {disabledOptions &&
            disabledOptions.map((option, i) => (
              <Option key={i} value={option} disabled>
                {option}
              </Option>
            ))}
          {options &&
            options.map((option, i) => (
              <Option key={i} value={option}>
                {option}
              </Option>
            ))}
        </Select>
        <Icon>{<IconDownArrow />}</Icon>
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}

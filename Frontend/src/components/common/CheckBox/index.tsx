import styled from 'styled-components';
import { useMemo } from 'react';

import { customize } from '@style/colors';
import { IconCheck } from '@style/icons';
import { CheckBoxOptionType } from 'types/style';
import ErrorMessage from 'components/common/Message/ErrorMessage';

interface IProps<T> {
  value: CheckBoxOptionType<T>[];
  onChange: (selected: CheckBoxOptionType<T>[]) => void;
  options: CheckBoxOptionType<T>[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  label?: string;
}

const Heading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Container = styled.div`
  &::after {
    display: flex;
    content: '';
    clear: both;
  }
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<{ checked: boolean }>`
  position: relative;
  display: flex;
  cursor: pointer;
  float: left;
  clear: both;
  border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 1.5rem;
  padding: ${({ checked }) =>
    checked ? '0.5rem 3rem 0.5rem 0.5rem' : '0.5rem 0.5rem 0.5rem 3rem'};
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Input = styled.input`
  &::-ms-clear {
    display: none;
  }

  &[type='checkbox'] {
    margin: 0;
    border: 0;
    width: 0;
    height: 0;
    --webkit-appearance: none;
  }

  &[type='checkbox']:checked {
    margin: 0;
    border: 0;
    --webkit-appearance: none;
  }

  &[type='checkbox'] + & {
    display: none;
  }
`;

const Icon = styled.i`
  height: auto;
  display: flex;
  align-items: center;
  margin: 0 8px;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${customize.lime['500']};
  }
`;

const Info = styled.div`
  width: 100%;
`;

const Title = styled.h1<{ isDescription: boolean }>`
  width: 100%;
  display: inline-flex;
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.mode.typo_main};
  line-height: ${({ isDescription }) => (isDescription ? '26px' : '44px')};
`;

const Description = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 12px;
  line-height: 14px;
  color: ${customize.gray['400']};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const CheckBoxGroup = <T extends string | number>({
  onChange,
  options,
  value = [],
  useValidation,
  isValid,
  errorMessage,
  label,
}: IProps<T>) => {
  const isOptionChecked = useMemo(
    () => (option: CheckBoxOptionType<T>) =>
      value.some((val) => val.title === option.title),
    [value]
  );

  const onChangeOptions = (option: CheckBoxOptionType<T>) => {
    const isSelectedOption = isOptionChecked(option);
    const updatedOptionOptions = isSelectedOption
      ? value.filter((val) => val.title !== option.title)
      : [...value, option];
    onChange(updatedOptionOptions);
  };

  return (
    <>
      {label && <Heading>{label}</Heading>}
      <Container>
        {options &&
          options.map((option) => (
            <Label key={option.title} checked={isOptionChecked(option)}>
              <Input
                type="checkbox"
                checked={isOptionChecked(option)}
                onChange={() => onChangeOptions(option)}
              />
              {isOptionChecked(option) && <Icon>{<IconCheck />}</Icon>}
              <Info>
                <Title isDescription={!!option.description}>
                  {option.title}
                </Title>
                {option.description ? (
                  <Description>{option.description}</Description>
                ) : null}
              </Info>
            </Label>
          ))}
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
};

export default CheckBoxGroup;

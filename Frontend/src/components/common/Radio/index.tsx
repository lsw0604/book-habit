import styled from 'styled-components';

import { customize } from '@style/colors';
import { RadioGroupOptionType } from 'types/style';
import ErrorMessage from 'components/common/Message/ErrorMessage';

interface IProps<T> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioGroupOptionType<T>[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.2rem 0;
`;

const Wrapper = styled.div`
  gap: 8px;
  &:after {
    content: '';
    clear: both;
  }
`;

const Heading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Label = styled.label`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  width: auto;
  margin-bottom: 8px;
`;

const Input = styled.input`
  &[type='radio'] {
    width: 1rem;
    height: 1rem;
    margin: 0;
    position: relative;
    -webkit-appearance: none;
    border: 2px solid ${({ theme }) => theme.colors.sub};
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }

  &[type='radio']:checked {
    border: 2px solid ${({ theme }) => theme.colors.sub};
  }

  &[type='radio']:checked:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 50%;
    display: block;
  }
`;

const Icon = styled.i`
  width: 1.3rem;
  height: 1.3rem;
  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const RadioInfo = styled.span`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.label<{ isDescription: boolean }>`
  color: ${({ theme }) => theme.mode.typo_main};
  text-align: center;
  font-size: 18px;
  line-height: ${({ isDescription }) => (isDescription ? '20px' : '34px')};
`;

const InfoDescription = styled.span`
  color: ${customize.gray['400']};
  font-size: 12px;
  font-size: 14px;
`;

const Radio = <T extends string | number>({
  label,
  value,
  options,
  onChange,
  isValid,
  useValidation,
  errorMessage,
}: IProps<T>) => {
  return (
    <>
      <Container>
        {label && <Heading>{label}</Heading>}
        <Wrapper>
          {options &&
            options.map((option, index) => (
              <Label key={index}>
                <Input
                  type="radio"
                  checked={value === option.value}
                  onChange={() => {
                    onChange && onChange(option.value);
                  }}
                />
                {option.icon && <Icon>{option.icon}</Icon>}
                <RadioInfo>
                  <InfoLabel isDescription={!!option.description}>
                    {option.label}
                  </InfoLabel>
                  {option.description && (
                    <InfoDescription>{option.description}</InfoDescription>
                  )}
                </RadioInfo>
              </Label>
            ))}
        </Wrapper>
        {errorMessage && isValid && useValidation && (
          <ErrorMessage message={errorMessage} />
        )}
      </Container>
    </>
  );
};

export default Radio;

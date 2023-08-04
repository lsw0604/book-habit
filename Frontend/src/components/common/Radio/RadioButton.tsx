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
  display: flex;
  &:after {
    content: ' ';
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.mode.sub};
  border-radius: 5px;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.spinner};
  }
`;

const Input = styled.input.attrs({ type: 'radio' })`
  width: 0;
  height: 0;
  margin: 0;
  position: relative;
  -webkit-appearance: none;
  outline: none;
`;

const Icon = styled.i`
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const InfoLabel = styled.label<{ isDescription: boolean }>`
  color: ${({ theme }) => theme.mode.typo_main};
  text-align: center;
  font-size: 1rem;
  line-height: ${({ isDescription }) => (isDescription ? '20px' : '34px')};
  height: auto;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
`;

const InfoLabelWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const InfoDescription = styled.span`
  color: ${customize.gray['400']};
  font-size: 10px;
  line-height: 14px;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const RadioButton = <T extends string | number>({
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
        {label ? (
          <>
            <Heading>{label}</Heading>
          </>
        ) : (
          ''
        )}
        <Wrapper>
          {options &&
            options.map((option, index) => (
              <Label key={index}>
                <Input
                  type="radio"
                  id={`radio-${index}`}
                  checked={value === option.value}
                  onChange={() => {
                    onChange && onChange(option.value);
                  }}
                />
                <InfoLabel
                  isDescription={!!option.description}
                  htmlFor={`radio-${index}`}
                >
                  <InfoLabelWrapper>
                    {option.icon && <Icon>{option.icon}</Icon>}
                    <div>{option.label}</div>
                  </InfoLabelWrapper>
                  {option.description && (
                    <InfoDescription>{option.description}</InfoDescription>
                  )}
                </InfoLabel>
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

export default RadioButton;

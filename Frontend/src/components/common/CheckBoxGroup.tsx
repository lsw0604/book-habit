import { customize } from '@style/colors';
import { IconCheck } from '@style/icons';
import styled from 'styled-components';
import { CheckBoxOptionType } from 'types/style';

interface IProps<T> {
  value: CheckBoxOptionType<T>[];
  onChange: (selected: CheckBoxOptionType<T>[]) => void;
  options: CheckBoxOptionType<T>[];
}

const Container = styled.div`
  &::after {
    display: flex;
    content: '';
    clear: both;
  }
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
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

const Title = styled.h1`
  width: 100%;
  display: inline-flex;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Description = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 4px;
  line-height: 10px;
  color: ${customize.gray['400']};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const CheckBoxGroup = <T extends string>({
  onChange,
  options,
  value = [],
}: IProps<T>) => {
  const isOptionChecked = (option: CheckBoxOptionType<T>) =>
    value.some((val) => val.title === option.title);

  return (
    <Container>
      {options &&
        options.map((option) => (
          <Label key={option.title} checked={isOptionChecked(option)}>
            <Input
              type="checkbox"
              checked={isOptionChecked(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...value, option]);
                } else {
                  onChange(
                    value.filter((option_) => option_.title !== option.title)
                  );
                }
              }}
            />
            {isOptionChecked(option) && <Icon>{<IconCheck />}</Icon>}
            <Info>
              <Title>{option.title}</Title>
              {option.description ? (
                <Description>{option.description}</Description>
              ) : (
                <Description></Description>
              )}
            </Info>
          </Label>
        ))}
    </Container>
  );
};

export default CheckBoxGroup;

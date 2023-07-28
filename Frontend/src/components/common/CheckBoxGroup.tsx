import React from 'react';
import styled from 'styled-components';

interface IProps {
  value: string[];
  onChange: (selected: string[]) => void;
  options: string[];
}

const Container = styled.div`
  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  float: left;
  clear: both;
  margin-bottom: 8px;
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

  &[type='checkbox'] + span {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    display: inline-block;
  }

  &[type='Checkbox'] + span::before {
    content: '';
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    display: inline-table;
    border: 2px solid black;
    border-radius: 2px;
    box-sizing: border-box;
    background-color: white;
    cursor: pointer;
  }

  &[type='checkbox']:checked + span::before {
    content: ' ';
    width: 18px;
    height: 18px;
    display: inline-table;
    border: 0;
    border-radius: 2px;
    background-color: blue;
    position: absolute;
  }
`;

const CheckBoxGroup = ({ onChange, options = [], value = [] }: IProps) => {
  return (
    <Container>
      {options.map((option) => (
        <Label key={option}>
          <Input
            type="checkbox"
            checked={value.includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, option]);
              } else {
                onChange(value.filter((option_) => option_ !== option));
              }
            }}
          />
          <span />
          {option}
        </Label>
      ))}
    </Container>
  );
};

export default CheckBoxGroup;

import styled from 'styled-components';
import ko from 'date-fns/locale/ko';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customize } from '@style/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;

  input {
    color: ${({ theme }) => theme.mode.typo_main};
  }

  .react-datepicker-wrapper {
    height: 100%;
    width: 100%;
  }

  .react-datepicker__input-container {
    height: 100%;
    width: 100%;
    input {
      background-color: ${({ theme }) => theme.mode.main};
    }
  }

  .react-datepicker {
    width: 100%;
    padding: 10px 10px;
    background-color: ${({ theme }) => theme.mode.main};
    border-radius: 12px;
    cursor: default;
    border: none;
    box-shadow: ${({ theme }) => theme.shadow.xxl};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__month-container {
    padding: 0;
    width: 100%;
  }

  .react-datepicker__header {
    width: 100%;
    font-size: 16px;
    border: 0;
    background-color: ${({ theme }) => theme.mode.main};
  }

  .react-datepicker__navigation--previous {
    top: 12px;
    left: 34px;
    border: 0;
  }

  .react-datepicker__navigation--next {
    top: 12px;
    right: 34px;
    border: 0;
  }

  .react-datepicker__current-month {
    width: 100%;
    font-size: 16px;
    color: ${({ theme }) => theme.mode.typo_main};
  }

  .react-datepicker__day-names {
    padding-top: 16px;
  }

  .react-datepicker__day-name {
    width: 2rem;
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.mode.typo_sub};
    &:first-child {
      color: ${customize.red['400']};
    }
    &:last-child {
      color: ${customize.sky['400']};
    }
  }
  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day {
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.mode.typo_main};
    outline: none;
    &:hover {
      color: ${({ theme }) => theme.mode.sub};
      background-color: ${({ theme }) => theme.colors.sub};
      border-radius: 50%;
    }
  }

  .react-datepicker__day--in-range:not(
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__month-text--in-selecting-range,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker__year-text--in-selecting-range
    ) {
    background-color: ${({ theme }) => theme.colors.spinner};
    border-radius: 50%;
  }
  .react-datepicker__day--outside-month {
    color: rgba(0, 0, 0, 0.3);
  }

  .react-datepicker__close-icon {
    &::after {
      background-color: ${({ theme }) => theme.colors.spinner};
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.spinner};
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${({ theme }) => theme.colors.spinner};
    border-radius: 50%;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.sub};
    color: ${({ theme }) => theme.mode.sub};
    border-radius: 50%;
    &:hover {
      background-color: ${({ theme }) => theme.colors.sub};
      color: ${({ theme }) => theme.mode.sub};
    }
  }
  .react-datepicker__day--range-start {
    background-color: ${({ theme }) => theme.colors.sub};
    color: ${({ theme }) => theme.mode.sub};
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background-color: ${({ theme }) => theme.colors.sub};
    color: ${({ theme }) => theme.mode.sub};
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    color: rgba(0, 0, 0, 0.1);
    cursor: no-drop;
    text-decoration: line-through;
  }
`;

export default function DatePicker({
  onChange,
  ...props
}: ReactDatePickerProps) {
  return (
    <Container>
      <ReactDatePicker
        popperPlacement="top-start"
        {...props}
        dateFormat="yyyy년 MM월 dd일"
        disabledKeyboardNavigation
        locale={ko}
        onChange={(date, event) => {
          if (date) {
            onChange(date, event);
          } else {
            onChange(null, event);
          }
        }}
      />
    </Container>
  );
}

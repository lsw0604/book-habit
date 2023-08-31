import styled from 'styled-components';

import DatePicker from 'components/common/DatePicker';
import ErrorMessage from 'components/common/Message/ErrorMessage';

interface IProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange: (date: Date | null) => void;
  date: Date | null;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;

  input {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: 0;
    border-radius: 12px;
    font-weight: 700;
    outline: none;
    cursor: pointer;
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

export default function DateSelector({
  endDate,
  startDate,
  onChange,
  date,
  errorMessage,
  isValid,
  useValidation,
}: IProps) {
  return (
    <>
      <Heading>날짜</Heading>
      <Container>
        <DatePicker
          minDate={startDate}
          onChange={onChange}
          selected={date}
          maxDate={endDate || new Date()}
          isClearable
        />
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}

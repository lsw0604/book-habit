import styled from 'styled-components';
import DatePicker from 'components/common/DatePicker';
import ErrorMessage from 'components/common/Message/ErrorMessage';

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
    font-weight: 600;
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

export default function BottomSheetEndDate({
  startDate,
  endDate,
  onChange,
  errorMessage,
  isValid,
  useValidation,
}: IBottomSheetEndDate) {
  return (
    <>
      <Heading>책 다 읽은 날</Heading>
      <Container>
        <DatePicker
          onChange={onChange}
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          isClearable
        />
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}

import styled from 'styled-components';
import ko from 'date-fns/locale/ko';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function DatePicker({
  onChange,
  ...props
}: ReactDatePickerProps) {
  return (
    <Container>
      <ReactDatePicker
        {...props}
        dateFormat="YYYY년 MM월 dd일"
        disabledKeyboardNavigation
        locale={ko}
        onChange={onChange}
      />
    </Container>
  );
}

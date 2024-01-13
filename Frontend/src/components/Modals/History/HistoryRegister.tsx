import HistoryRegisterForm from './HistoryRegisterForm';
import ModalHeader from '../ModalHeader';
import { IconCalendar } from '@style/icons';

const HEADER_OPTION = {
  title: '달력에 독서기록을 등록해요',
  sub: '등록할 독서기록의 상태와 날짜를 입력해주세요.',
  icon: <IconCalendar />,
};

export default function HistoryRegister() {
  return (
    <HistoryRegisterForm>
      <ModalHeader {...HEADER_OPTION} />
    </HistoryRegisterForm>
  );
}

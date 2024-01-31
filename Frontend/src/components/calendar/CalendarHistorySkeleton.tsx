import Loader from 'components/common/loader';
import styled from 'styled-components';

interface IProps {
  mode: 'isLoading' | 'isEmpty' | 'isFilter';
}

const Container = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  line-height: 22px;
`;

const MODE_OBJ = {
  isLoading: '',
  isEmpty: '아직 등록된 독서기록이 없습니다.',
  isFilter: '찾고자하는 상태를 선택해주세요.',
};

export default function CalendarHistorySkeleton({ mode }: IProps) {
  return (
    <Container>
      <Message>{MODE_OBJ[mode]}</Message>
      {mode === 'isLoading' && <Loader size={2} />}
    </Container>
  );
}

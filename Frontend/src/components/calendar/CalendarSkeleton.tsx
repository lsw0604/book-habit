import Loader from 'components/common/loader';
import styled from 'styled-components';

interface IProps {
  mode: 'loading' | 'empty';
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const LoadingWrapper = styled.div`
  height: 10rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const SKELETON_OBJ = {
  loading: <Loader />,
  empty: '데이터를 불러오는데 실패했습니다.',
};

export default function CalendarSkeleton({ mode }: IProps) {
  return (
    <Container>
      <LoadingWrapper>{SKELETON_OBJ[mode]}</LoadingWrapper>
    </Container>
  );
}

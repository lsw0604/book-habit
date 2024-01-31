import Loader from 'components/common/loader';
import styled from 'styled-components';

interface IProps {
  mode: 'isLoading' | 'isEmpty';
}

const Container = styled.div`
  width: 100%;
  height: 275px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
  @media screen and (min-width: 1280px) {
    height: 100%;
  }
`;

export default function MyBookDetailLoader({ mode }: IProps) {
  return (
    <Container>
      {mode === 'isLoading' && <Loader size={2} />}
      {mode === 'isEmpty' && '아직 등록된 한줄평이 없습니다.'}
    </Container>
  );
}

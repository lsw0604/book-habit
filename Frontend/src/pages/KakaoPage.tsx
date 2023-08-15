import useKakaoCallbackHook from '@hooks/useKakaoCallbackHook';
import Loader from 'components/common/Loader';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KakaoPage() {
  const code = new URLSearchParams(window.location.search).get(
    'code'
  ) as string;

  // if (code) {
  const { isLoading } = useKakaoCallbackHook(code);
  return <Container>{isLoading && <Loader size={2} />}</Container>;
  // }

  return <Container>잘못된 접근 방식입니다.</Container>;
}
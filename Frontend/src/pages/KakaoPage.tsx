import styled from 'styled-components';

import useKakaoCallbackHook from '@hooks/useKakaoCallbackHook';
import Loader from 'components/common/Loader';

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

  const { isLoading } = useKakaoCallbackHook(code);

  if (!code) {
    return <Container>Code를 불러오지 못 했습니다.</Container>;
  }

  if (isLoading) {
    return <Container>{isLoading && <Loader size={2} />}</Container>;
  }

  return <Container>카카오 로그인 성공</Container>;
}

import styled from 'styled-components';

import useKakaoCallbackQuery from '@queries/kakao/useKakaoCallbackQuery';
import Loader from 'components/common/Loader';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KakaoPage() {
  const code = new URLSearchParams(window.location.search).get(
    'code'
  ) as string;
  const navigate = useNavigate();

  const { isLoading, isError } = useKakaoCallbackQuery(code);

  if (!code) {
    navigate('/search');
    return <Container>code가 존재 하지 않습니다.</Container>;
  }

  if (isError) {
    return <Container>error가 발생했습니다.</Container>;
  }

  if (isLoading) {
    return <Container>{isLoading && <Loader size={2} />}</Container>;
  }

  return <Container>카카오 로그인 성공 했습니다.</Container>;
}

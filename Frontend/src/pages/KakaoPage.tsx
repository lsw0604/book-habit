import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import useKakaoCallbackQuery from '@queries/kakao/useKakaoCallbackQuery';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ErrorWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.mode.typo_sub};
  gap: 8px;
`;

const Span = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: center;
`;

const Number = styled.p`
  color: ${({ theme }) => theme.colors.spinner};
`;

export default function KakaoPage() {
  const [second, setSecond] = useState<number>(0);
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get(
    'code'
  ) as string;
  const { isLoading, isError, error, refetch } = useKakaoCallbackQuery(code);

  useEffect(() => {
    refetch();
    setSecond(3);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);
      if (second === 1) {
        navigate('/');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, setSecond]);

  if (!code) return <Navigate to="/404" />;

  if (error) {
    return (
      <Container>
        <ErrorWrapper>
          <Span>로그인에 오류가 발생했습니다.</Span>
          <Span>
            <Number>{second}</Number>&nbsp;초 후에 홈페이지로 이동합니다.
          </Span>
        </ErrorWrapper>
      </Container>
    );
  }

  if (isLoading || isError) {
    return (
      <Container>
        <div className="error_page">
          <Loader size={2} />
        </div>
      </Container>
    );
  }

  return <Container>카카오 로그인 성공 했습니다.</Container>;
}

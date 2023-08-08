import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export default function KakaoPage() {
  const code = new URLSearchParams(window.location.search).get('code');

  const fetchCode = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/auth/kakao/callback?code=${code}`
    );

    console.log(data);
  };

  useEffect(() => {
    fetchCode();
  }, []);

  return <Container></Container>;
}

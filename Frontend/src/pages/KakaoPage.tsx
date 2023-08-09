import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToastHook();
  const setUserState = useSetRecoilState(userAtom);

  const fetchCode = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/auth/kakao/callback?code=${code}`,
      { withCredentials: true }
    );

    const { id, email, name, gender, age, message, status, provider } = data;

    if (!gender || !name || !id || !age || !email) {
      navigate('/register/kakao');
    }

    if (id && email && name && gender && age) {
      navigate('/');
      setUserState({ id, isLogged: true, age, gender, name, email, provider });
      addToast({ message, status });
    }
  };

  useEffect(() => {
    fetchCode().then((res) => console.log(res));
  }, []);

  return <Container></Container>;
}

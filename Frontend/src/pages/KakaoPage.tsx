import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import useKakaoCallbackHook from '@hooks/useKakaoCallbackHook';
import Loader from 'components/common/Loader';
import { userAtom } from 'recoil/user';
import useToastHook from '@hooks/useToastHook';

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
  const setUserState = useSetRecoilState(userAtom);
  const { addToast } = useToastHook();

  const { isLoading, isSuccess, data, isError } = useKakaoCallbackHook(code);

  useEffect(() => {
    if (isSuccess) {
      const {
        email,
        id,
        gender,
        age,
        name,
        provider,
        message,
        status,
        access_jwt,
      } = data;

      window.localStorage.setItem('ACCESS', access_jwt);
      setUserState({ email, id, gender, age, name, isLogged: true, provider });
      addToast({ message, status });
    }
  }, [isSuccess, isLoading]);

  if (!code) {
    return <Container>Code를 불러오지 못 했습니다.</Container>;
  }

  if (isError) {
    return <Container>error가 발생했습니다.</Container>;
  }

  if (isLoading) {
    return <Container>{isLoading && <Loader size={2} />}</Container>;
  }

  return <Container>카카오 로그인 성공 했습니다.</Container>;
}

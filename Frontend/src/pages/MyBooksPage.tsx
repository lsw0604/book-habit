import styled from 'styled-components';

import MyBooks from 'components/MyBooks';
import { userAtom } from 'recoil/user';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const Contents = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: calc(100vh - 11rem);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function MyBooksPage() {
  const userState = useRecoilValue(userAtom);
  return (
    <Container>
      {userState.isLogged ? (
        <MyBooks />
      ) : (
        <Contents>
          <span>로그인이 필요해요.</span>
        </Contents>
      )}
    </Container>
  );
}

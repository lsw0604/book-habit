import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import MyBooks from 'components/MyBooks/MyBooks';
import HelmetProvider from 'components/common/HelmetProvider';

import { userAtom } from 'recoil/user';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default function MyBooksPage() {
  const { name } = useRecoilValue(userAtom);

  const title = `${name}님의 서재`;
  const description = '내 서재를 보여주는 페이지입니다.';

  return (
    <>
      <HelmetProvider title={title} description={description} />
      <Container>
        <MyBooks />
      </Container>
    </>
  );
}

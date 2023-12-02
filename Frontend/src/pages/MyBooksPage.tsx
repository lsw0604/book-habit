import styled from 'styled-components';

import MyBooks from 'components/MyBooks';
import HelmetProvider from 'components/common/HelmetProvider';
import { useRecoilValue } from 'recoil';
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

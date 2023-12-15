import styled from 'styled-components';

import MyBooks from 'components/MyBooks/MyBooks';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default function MyBooksPage() {
  return (
    <HelmetProvider
      title="내 서재"
      description="내 서재를 보여주는 페이지입니다."
    >
      <Container>
        <MyBooks />
      </Container>
    </HelmetProvider>
  );
}

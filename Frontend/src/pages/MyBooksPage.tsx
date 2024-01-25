import styled from 'styled-components';

import HelmetProvider from 'components/common/HelmetProvider';
import MyBookList from 'components/my-books/my-book-list';
import MyBookSelector from 'components/my-books/my-book-selector';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function MyBooksPage() {
  return (
    <HelmetProvider
      title="내 서재"
      description="내 서재를 보여주는 페이지입니다."
    >
      <Container>
        <MyBookSelector />
        <MyBookList />
      </Container>
    </HelmetProvider>
  );
}

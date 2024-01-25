import styled from 'styled-components';

import SearchInput from 'components/search/search-input';
import SearchList from 'components/search/search-list';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
`;

export default function SearchPage() {
  return (
    <HelmetProvider title="책 검색" description="책 검색하는 페이지입니다.">
      <Container>
        <Header>
          <SearchInput />
        </Header>
        <Contents>
          <SearchList />
        </Contents>
      </Container>
    </HelmetProvider>
  );
}

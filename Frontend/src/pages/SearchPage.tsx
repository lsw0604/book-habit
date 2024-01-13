import styled from 'styled-components';

import SearchInput from 'components/Search/SearchInput';
import SearchList from 'components/Search/SearchList';
import HelmetProvider from 'components/common/HelmetProvider';
import { Suspense } from 'react';
import SearchLoader from 'components/Search/SearchLoader';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
`;

export default function SearchPage() {
  return (
    <HelmetProvider title="책 검색" description="책 검색하는 페이지입니다.">
      <Container>
        <Wrapper>
          <SearchInput />
        </Wrapper>
        <Contents>
          <Suspense fallback={<SearchLoader height="100%" />}>
            <SearchList />
          </Suspense>
        </Contents>
      </Container>
    </HelmetProvider>
  );
}

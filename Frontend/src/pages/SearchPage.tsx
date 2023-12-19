import styled from 'styled-components';
import { ChangeEvent, useCallback, useState, memo, useMemo } from 'react';

import SearchInput from 'components/Search/SearchInput';
import SearchList from 'components/Search/SearchList';
import HelmetProvider from 'components/common/HelmetProvider';

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

const MemorizedSearchList = memo(SearchList);

export default function SearchPage() {
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const memorizedQuery = useMemo(() => query, [query]);

  return (
    <HelmetProvider title="책 검색" description="책 검색하는 페이지입니다.">
      <Container>
        <Wrapper>
          <SearchInput
            onChange={onChange}
            search={search}
            setQuery={setQuery}
          />
        </Wrapper>
        <Contents>
          <MemorizedSearchList search={memorizedQuery} />
        </Contents>
      </Container>
    </HelmetProvider>
  );
}

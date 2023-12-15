import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';
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

export default function SearchPage() {
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookSearchInfinityQuery(query);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(search);
    setInitialLoadComplete(false);
  };

  return (
    <HelmetProvider title="책 검색" description="책 검색하는 페이지입니다.">
      <Container>
        <Wrapper>
          <SearchInput
            onChange={onChange}
            search={search}
            onSubmit={onSubmit}
          />
        </Wrapper>
        <Contents>
          <SearchList
            initialLoadComplete={initialLoadComplete}
            setInitialLoadComplete={setInitialLoadComplete}
            search={query}
            data={data}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </Contents>
      </Container>
    </HelmetProvider>
  );
}

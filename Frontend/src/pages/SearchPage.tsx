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

const HELMET_PROVIDER_OPTIONS = {
  title: '검색하기',
  description: '내가 읽거나 관심있는 책을 검색합니다.',
};

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
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
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
    </>
  );
}

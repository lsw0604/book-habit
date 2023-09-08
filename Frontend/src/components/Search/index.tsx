import styled from 'styled-components';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

import SearchInput from './SearchInput';
import SearchList from './SearchList';
import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index() {
  const [search, setSearch] = useState<string>('');

  const { refetch, data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookSearchInfinityQuery(search);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  return (
    <Container>
      <Wrapper>
        <SearchInput onChange={onChange} search={search} onSubmit={onSubmit} />
      </Wrapper>
      <Wrapper>
        <SearchList
          search={search}
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </Wrapper>
    </Container>
  );
}

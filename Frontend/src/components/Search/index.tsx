import styled from 'styled-components';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

import SearchInput from './SearchInput';
import SearchList from './SearchList';
import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 20px;
`;

export default function Index() {
  const [search, setSearch] = useState<string>('');

  const { refetch, data, fetchNextPage, hasNextPage, isFetching } =
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
      <Contents>
        {data && data?.pages.length > 0 ? (
          <SearchList
            search={search}
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        ) : (
          <Span>책 제목을 검색해 주세요.</Span>
        )}
      </Contents>
    </Container>
  );
}

import styled from 'styled-components';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

import SearchInput from './SearchInput';
import SearchList from './SearchList';
import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';

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

const SpanWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.mode.typo_main};
    font-size: 20px;
  }
`;

export default function Index() {
  const [search, setSearch] = useState<string>('');
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const { refetch, data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookSearchInfinityQuery(search);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInitialLoadComplete(false);
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
            initialLoadComplete={initialLoadComplete}
            setInitialLoadComplete={setInitialLoadComplete}
            search={search}
            data={data}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        ) : (
          <SpanWrapper>
            <span>책 제목을 검색해 주세요.</span>
          </SpanWrapper>
        )}
      </Contents>
    </Container>
  );
}

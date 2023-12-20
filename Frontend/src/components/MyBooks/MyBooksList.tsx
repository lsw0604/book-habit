import { useRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import Observer from 'components/common/Observer';
import MyBooksPage from 'components/MyBooks/MyBooksPage';
import MyBooksSkeleton from 'components/MyBooks/MyBooksSkeleton';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';

interface IProps {
  status?: string;
}

const Container = styled.div`
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export default function List({ status }: IProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useMyBookListInfinityQuery(status as SelectorBookType);

  const lastPageRef = useRef<HTMLDivElement>(null);

  if (!data || isLoading) return <MyBooksSkeleton isLoading background />;
  if (data.pages[0].books.length === 0) return <MyBooksSkeleton />;

  return (
    <Container>
      {data.pages.map((page) => (
        <MyBooksPage page={page} key={v4()} />
      ))}
      {hasNextPage ? (
        <Observer
          observerRef={lastPageRef}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
        />
      ) : null}
      {isFetching && <MyBooksSkeleton isLoading />}
    </Container>
  );
}

import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import Loader from 'components/common/Loader';
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

const FetchLoader = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
`;

const Observer = styled.div`
  margin-bottom: 20px;
`;

export default function List({ status }: IProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useMyBookListInfinityQuery(status as SelectorBookType);

  const lastPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entires) => {
      if (entires[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, observerOptions);

    if (lastPageRef.current) {
      observer.observe(lastPageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (!data || isLoading) return <MyBooksSkeleton isLoading />;
  if (data.pages[0].books.length === 0) return <MyBooksSkeleton />;

  return (
    <Container>
      {data.pages.map((page) => (
        <MyBooksPage page={page} key={v4()} />
      ))}
      {isFetching ? (
        <FetchLoader>
          <Loader size={2} />
        </FetchLoader>
      ) : !hasNextPage ? null : (
        <Observer ref={lastPageRef} />
      )}
    </Container>
  );
}

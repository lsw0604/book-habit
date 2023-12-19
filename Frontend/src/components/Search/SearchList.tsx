import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import SearchItem from 'components/Search/SearchItem';
import SearchSkeleton from 'components/Search/SearchSkeleton';
import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';
import SearchLoader from './SearchLoader';

interface IProps {
  search: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
`;

const Page = styled.div`
  padding: 0 1rem;
  width: 100%;
  gap: 1rem;
  :first-child {
    margin-top: 0px;
  }
  @media screen and (min-width: 360px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
  }
`;

const Observer = styled.div`
  margin-bottom: 20px;
`;

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function SearchList({ search }: IProps) {
  const lastSearchRef = useRef<HTMLDivElement>(null);

  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookSearchInfinityQuery(search);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
      observer.disconnect();
    }
  }, OBSERVER_OPTION);

  useEffect(() => {
    if (lastSearchRef.current) {
      observer.observe(lastSearchRef.current);
      setInitialLoadComplete(false);
    }
    setInitialLoadComplete(true);

    return () => {
      if (lastSearchRef.current) {
        observer.unobserve(lastSearchRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetching, initialLoadComplete]);

  if (search === '' && !data) return <SearchSkeleton search={search} />;

  if (!data || isLoading) return <SearchLoader />;

  if (data?.pages[0].documents.length === 0)
    return <SearchSkeleton search={search} />;

  return (
    <Container>
      {data?.pages.map((page) => (
        <Page key={v4()}>
          {page.documents.map((document) => (
            <SearchItem key={document.isbn} search={search} item={document} />
          ))}
        </Page>
      ))}
      {isFetching ? (
        <SearchLoader />
      ) : hasNextPage && initialLoadComplete ? (
        <Observer ref={lastSearchRef} />
      ) : null}
    </Container>
  );
}

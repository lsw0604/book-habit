import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';

import Loader from 'components/common/Loader';
import SearchItem from 'components/Search/SearchItem';
import SearchSkeleton from './SearchSkeleton';

interface IProps {
  data: InfiniteData<KakaoSearchResponseType> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  search: string;
  isLoading: boolean;
  initialLoadComplete: boolean;
  setInitialLoadComplete: (ctx: boolean) => void;
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

const FetchLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const Observer = styled.div`
  margin-bottom: 20px;
`;

export default function SearchList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  search,
  isLoading,
  initialLoadComplete,
  setInitialLoadComplete,
}: IProps) {
  const lastSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
        observer.disconnect();
      }
    }, observerOptions);

    if (lastSearchRef.current) {
      observer.observe(lastSearchRef.current);
    }
    setInitialLoadComplete(true);

    return () => {
      if (lastSearchRef.current) {
        observer.unobserve(lastSearchRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetching, initialLoadComplete]);

  if (search === '' || !data) return <SearchSkeleton search={search} />;

  if (data.pages[0].documents.length === 0)
    return <SearchSkeleton search={search} />;

  return (
    <Container>
      {data?.pages.map((page) => (
        <Page key={v4()}>
          {page.documents.map((document) => (
            <SearchItem key={document.isbn} search={search} {...document} />
          ))}
        </Page>
      ))}
      {isFetching || isLoading ? (
        <FetchLoader>
          <Loader />
        </FetchLoader>
      ) : hasNextPage && initialLoadComplete ? (
        <Observer ref={lastSearchRef} />
      ) : null}
    </Container>
  );
}

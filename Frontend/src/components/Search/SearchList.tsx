import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

import Loader from 'components/common/Loader';
import SearchItem from 'components/Search/SearchItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Page = styled.div<{ dataExist: boolean }>`
  padding: 0 1rem;
  display: ${({ dataExist }) => (dataExist ? 'grid' : null)};
  gap: 1rem;
  :first-child {
    margin-top: 0px;
  }
  @media screen and (min-width: 414px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 514px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 824px) {
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

  return (
    <Container>
      {data?.pages.map((page, index) => (
        <Page key={index} dataExist={page.documents.length !== 0}>
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

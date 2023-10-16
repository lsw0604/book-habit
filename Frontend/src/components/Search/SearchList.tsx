import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef, memo } from 'react';
import { v4 } from 'uuid';

import Loader from 'components/common/Loader';
import SearchItem from 'components/Search/SearchItem';

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

const EmptyPageContainer = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  .empty_page {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty_page_message {
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.mode.typo_sub};
  }

  .highlight {
    font-size: 24px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.sub};
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
  const MemorizedSearchItem = memo(SearchItem);

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
      {data?.pages.map((page) =>
        page.documents.length === 0 ? (
          <EmptyPageContainer key={v4()}>
            <div className="empty_page">
              <p className="empty_page_message">
                <span className="empty_page_message highlight">{search}</span>
                에 대한
                <br /> 검색 결과가 없습니다.
              </p>
            </div>
          </EmptyPageContainer>
        ) : (
          <Page key={v4()}>
            {page.documents.map((document) => (
              <MemorizedSearchItem
                key={document.isbn}
                search={search}
                {...document}
              />
            ))}
          </Page>
        )
      )}
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

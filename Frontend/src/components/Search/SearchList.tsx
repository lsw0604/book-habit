import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import Loader from 'components/common/Loader';
import SearchItem from './SearchItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  :first-child {
    margin-top: 0px;
  }
`;

const FetchLoader = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

const Observer = styled.div`
  margin-bottom: 20px;
`;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 440px;
`;

interface IProps {
  data: InfiniteData<KakaoSearchResponseType> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isLoading: boolean;
}

export default function SearchList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isLoading,
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
      }
    }, observerOptions);

    if (lastSearchRef.current) {
      observer.observe(lastSearchRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <Container>
      {data && data?.pages.length > 0 ? (
        data?.pages.map((page, i) => (
          <Page key={i}>
            {page.documents.map((document) => (
              <SearchItem key={document.isbn} {...document} />
            ))}
          </Page>
        ))
      ) : isLoading ? (
        <ResultWrapper>
          <span>책 제목을 검색해주세요.</span>
        </ResultWrapper>
      ) : (
        <ResultWrapper>
          <Loader size={2} />
        </ResultWrapper>
      )}
      {isFetching ? (
        <FetchLoader>
          <Loader />
        </FetchLoader>
      ) : !hasNextPage ? null : (
        <Observer ref={lastSearchRef} />
      )}
    </Container>
  );
}

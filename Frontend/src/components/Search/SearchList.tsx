import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

import Loader from 'components/common/Loader';
import SearchItem from 'components/Search/SearchItem';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow: scroll;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 15rem);
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
  background-color: rgba(0, 0, 0, 0.09);
`;

interface IProps {
  data: InfiniteData<KakaoSearchResponseType> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isLoading: boolean;
  search: string;
}

export default function SearchList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isLoading,
  search,
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
          <Page key={i} dataExist={page.documents.length !== 0}>
            {page.documents.length !== 0 ? (
              page.documents.map((document) => (
                <SearchItem key={document.isbn} search={search} {...document} />
              ))
            ) : (
              <ResultWrapper>
                <span>검색 결과가 없습니다.</span>
              </ResultWrapper>
            )}
          </Page>
        ))
      ) : isLoading ? (
        <div style={{ padding: '0 1rem' }}>
          <ResultWrapper>
            <span>책 제목을 검색해주세요.</span>
          </ResultWrapper>
        </div>
      ) : (
        <div style={{ padding: '0 1rem' }}>
          <ResultWrapper>
            <Loader size={3} />
          </ResultWrapper>
        </div>
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

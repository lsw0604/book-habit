import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

import Loader from 'components/common/Loader';
import SearchItem from 'components/Search/SearchItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
  /* background-color: rgba(0, 0, 0, 0.08); */
`;

const Span = styled.span``;

interface IProps {
  data: InfiniteData<KakaoSearchResponseType> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  search: string;
}

export default function SearchList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
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
    <>
      <Container>
        {data?.pages.map((page, index) => (
          <Page key={index} dataExist={page.documents.length !== 0}>
            {page.documents.map((document) => (
              <SearchItem key={document.isbn} search={search} {...document} />
            ))}
          </Page>
        ))}
        <div>나는 fetch</div>
      </Container>
      {/* {data && data?.pages.length > 0 && isFetching ? (
        <FetchLoader>
          <Loader />
        </FetchLoader>
      ) : !hasNextPage ? null : (
        <Observer ref={lastSearchRef} />
      )} */}
    </>
  );
}

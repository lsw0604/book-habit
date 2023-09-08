import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import Item from 'components/MyBooks/Item';
import Loader from 'components/common/Loader';
import Empty from 'components/MyBooks/Empty';

interface IProps {
  status?: string;
}

const Container = styled.div`
  margin-top: 1rem;
  height: calc(100vh - 15rem);
  padding: 1rem;
  overflow: scroll;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Page = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  &:last-child {
    margin-bottom: 0px;
  }

  @media screen and (min-width: 514px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 714px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
  }
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

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      ) : data && data.pages && data.pages[0].books.length !== 0 ? (
        data.pages.map((page, index) => (
          <Page key={index}>
            {page.books.length !== 0
              ? page.books.map((book, index) => <Item key={index} {...book} />)
              : null}
          </Page>
        ))
      ) : (
        <Empty />
      )}
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

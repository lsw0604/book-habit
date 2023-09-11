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
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <>
      {isLoading ? (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      ) : (
        <Container>
          {data && data.pages && data.pages[0].books.length > 0 ? (
            data.pages.map((page, index) => (
              <Page key={index}>
                {page.books.map((book) => (
                  <Item key={book.id} {...book} />
                ))}
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
      )}
    </>
  );
}

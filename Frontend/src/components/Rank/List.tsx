import { useEffect, useRef, useState, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

import useRankingHook from '@hooks/useRankingHook';
import Loader from 'components/common/Loader';
import Item from './Item';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: grid;

  .loader {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }

  .observer {
    margin-bottom: 20px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Page = styled.div``;

export default function RankList() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useRankingHook();

  const lastBookRef = useRef<HTMLDivElement>(null);

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

    if (lastBookRef.current) {
      observer.observe(lastBookRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          {data?.pages.map((page, i) => (
            <Page key={i} className="page">
              {page.books.map((book) => (
                <Item
                  author={book.author}
                  company={book.company}
                  image={book.image}
                  isbn={book.isbn}
                  price={book.price}
                  ranking={book.ranking}
                  title={book.title}
                  key={book.isbn}
                />
              ))}
            </Page>
          ))}
          {isFetching ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <div ref={lastBookRef} className="observer" />
          )}
        </Wrapper>
      )}
    </Container>
  );
}

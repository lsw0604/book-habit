import { useEffect, useRef } from 'react';

import useBookHook from '@hooks/useBookHook';
import Loader from 'components/common/Loader';

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookHook();

  const lastBookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entires) => {
      if (entires[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, options);

    if (lastBookRef.current) {
      observer.observe(lastBookRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          {data?.pages.map((page) =>
            page.books.map((book) => (
              <div key={book.title}>
                <div>{book.book_rank}</div>
                <img
                  height="140px"
                  width="100px"
                  src={book.img}
                  key={book.img}
                />
                <span>{book.title}</span>
                <span>{book.author}</span>
              </div>
            ))
          )}
          {!isFetching ? (
            <div ref={lastBookRef} style={{ marginBottom: '10px' }} />
          ) : (
            <div
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '30px',
              }}
            >
              <Loader />
            </div>
          )}
        </div>
      )}
    </>
  );
}

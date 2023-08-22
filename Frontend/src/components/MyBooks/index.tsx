import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import useMyBookHook from '@hooks/useMyBookHook';
import Loader from 'components/common/Loader';
import MyBooksItem from 'components/MyBooks/MyBooksItem';
import Selector from 'components/common/Selector';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

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

const Loading = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  gap: 1rem;
`;

const Page = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  @media screen and (min-width: 414px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 1014px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
  }
`;

export default function Index() {
  const options: SelectorBookType[] = [
    '전체보기',
    '다읽음',
    '읽는중',
    '읽고싶음',
  ];

  const [value, setValue] = useState<string | undefined>('전체보기');

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useMyBookHook(value as SelectorBookType);
  const lastPageRef = useRef<HTMLDivElement>(null);

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
        <Container>
          <Loading>
            <Loader size={2} />
          </Loading>
        </Container>
      ) : (
        <Wrapper>
          <Selector
            label="내 책 상태에 따라 서재에 보여지는게 달라요"
            options={options}
            value={value}
            onChange={(e) => setValue(e)}
          />
          {data?.pages.map((page, index) => (
            <Page key={index}>
              {page.books.map((book, index) => (
                <MyBooksItem
                  key={index}
                  image={book.image}
                  isbn={book.isbn}
                  status={book.status}
                />
              ))}
            </Page>
          ))}
          {isFetching ? (
            <div className="loader">
              <Loader size={2} />
            </div>
          ) : !hasNextPage ? null : (
            <div ref={lastPageRef} className="observer" />
          )}
        </Wrapper>
      )}
    </>
  );
}

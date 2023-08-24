import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import useMyBookHook from '@hooks/useMyBookHook';
import Loader from 'components/common/Loader';
import Item from 'components/MyBooks/Item';
import Selector from 'components/common/Selector';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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

const EmptyPage = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: calc(100vh - 15rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.mode.typo_main};
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    gap: 3rem;
  }
  .header {
    width: 100%;
    text-align: center;
  }
  .content {
    width: 100%;
    text-align: center;
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
          {data &&
            data.pages.map((page, index) => (
              <Page key={index}>
                {page.books.length !== 0
                  ? page.books.map((book, index) => (
                      <Item
                        key={index}
                        image={book.image}
                        isbn={book.isbn}
                        status={book.status}
                      />
                    ))
                  : null}
              </Page>
            ))}
          {data && data.pages && data.pages[0].books.length === 0 && (
            <EmptyPage>
              <span className="header">서재가 비어있어요.</span>
              <span className="wrapper">
                <span className="content">읽었거나</span>
                <span className="content">읽는중이거나</span>
                <span className="content">읽고싶은 책들을</span>
                <span className="content">추가해보세요</span>
                <span className="content">.</span>
                <span className="content">.</span>
                <span className="content">.</span>
              </span>
            </EmptyPage>
          )}
          {isFetching ? (
            <FetchLoader>
              <Loader size={2} />
            </FetchLoader>
          ) : !hasNextPage ? null : (
            <Observer ref={lastPageRef} className="observer" />
          )}
        </Wrapper>
      )}
    </>
  );
}

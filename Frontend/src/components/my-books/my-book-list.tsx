import { useRef } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

import MyBookItem from './my-book-item';

import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';

const Container = styled.div`
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const ListWrapper = styled.ul`
  width: 100%;
  display: grid;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media screen and (min-width: 648px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.5rem;
  }

  @media screen and (min-width: 1536px) {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 0.5rem;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const Observer = styled.div`
  margin-bottom: 20px;
`;

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function MyBookList() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') as SelectorBookType;

  const lastPageRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(lastPageRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useMyBookListInfinityQuery(category as SelectorBookType);

  useUpdateEffect(() => {
    if (isVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisible]);

  if (!data || isLoading) return <MyBookList.Loader />;
  if (data.pages[0].books.length === 0) return <MyBookList.Empty />;

  const _document = data.pages.flatMap((page) => page.books);

  return (
    <Container>
      <ListWrapper>
        {_document.map((page) => (
          <MyBookItem item={page} key={page.id} />
        ))}
      </ListWrapper>
      <Observer ref={lastPageRef} />
    </Container>
  );
}

const MyBookListEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`;

const MyBookListEmptyBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
`;

MyBookList.Empty = function MyBookListEmpty() {
  return (
    <MyBookListEmptyContainer>
      <MyBookListEmptyBackground>
        <p>해당 상태로 등록된 책이 없습니다.</p>
      </MyBookListEmptyBackground>
    </MyBookListEmptyContainer>
  );
};

MyBookList.Loader = function MyBookListLoader() {
  return (
    <Container>
      <ListWrapper>
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
      </ListWrapper>
    </Container>
  );
};

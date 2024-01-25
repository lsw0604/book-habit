import { v4 } from 'uuid';
import styled from 'styled-components';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

import SearchItem from 'components/search/search-item';

import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';

interface SearchListEmptyProps {
  keyword?: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
`;

const ListWrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const ObserverContainer = styled.div`
  margin-bottom: 20px;
`;

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function SearchList() {
  const lastSearchRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(lastSearchRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  const [searchParams] = useSearchParams();

  const keyword =
    searchParams.get('keyword') !== null
      ? (searchParams.get('keyword') as string)
      : undefined;

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useBookSearchInfinityQuery(keyword);

  useUpdateEffect(() => {
    if (isVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisible]);

  if (isLoading || !data) return <SearchList.Loader />;
  if (!keyword || data?.pages[0].documents.length === 0)
    return <SearchList.Empty keyword={keyword} />;

  const _document = data.pages.flatMap((page) => page.documents);

  return (
    <Container>
      <ListWrapper>
        {_document.map((page) => (
          <SearchItem key={v4()} item={page} search={keyword} />
        ))}
      </ListWrapper>
      <ObserverContainer ref={lastSearchRef} />
    </Container>
  );
}

SearchList.Loader = function SearchListLoader() {
  return (
    <Container>
      <ListWrapper>
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
      </ListWrapper>
    </Container>
  );
};

const SearchListEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`;

const SearchListEmptyBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchListEmptySpan = styled.span`
  display: flex;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const SearchListEmptyHighlight = styled.p`
  color: ${({ theme }) => theme.colors.sub};
`;

SearchList.Empty = function SearchListEmpty({ keyword }: SearchListEmptyProps) {
  return (
    <SearchListEmptyContainer>
      <SearchListEmptyBackground>
        {keyword ? (
          <SearchListEmptySpan>책 제목을 검색해주세요.</SearchListEmptySpan>
        ) : (
          <SearchListEmptySpan>
            <SearchListEmptyHighlight>{keyword}</SearchListEmptyHighlight>에
            대한 검색결과가 없습니다.
          </SearchListEmptySpan>
        )}
      </SearchListEmptyBackground>
    </SearchListEmptyContainer>
  );
};

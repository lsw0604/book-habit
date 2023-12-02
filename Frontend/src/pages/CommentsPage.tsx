import styled from 'styled-components';
import dayjs from 'dayjs';

import Loader from 'components/common/Loader';
import PublicCommentsItem from 'components/Comments/Item/PublicCommentItem';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import CommentTimer from 'components/Comments/CommentTimer';
import CommentHashTag from 'components/Comments/CommentHashTag';
import { useState } from 'react';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
  .empty_page {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty_page_message {
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FetchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

const TimerWrapper = styled.div`
  padding: 0 1rem;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`;

const HELMET_PROVIDER_OPTIONS = {
  title: '한줄평',
  description:
    '척벌래 이용하는 유저들이 공개 등록한 한줄평을 보여주는 페이지입니다.',
};

export default function CommentsPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const { data, isFetching, isLoading, refetch } = useCommentsListQuery(filter);

  if (data === undefined) return null;

  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader size={2} />
      </LoaderContainer>
    );
  }

  if (data.comments.length === 0) {
    return (
      <EmptyContainer>
        <div className="empty_page">
          <p className="empty_page_message">
            {`${parseInt(dayjs().format('MM'))}`}월에 등록된 한줄평이 아직
            없어요.
          </p>
        </div>
      </EmptyContainer>
    );
  }

  const addFilter = (tag: string) => {
    if (!filter.includes(tag)) {
      setFilter((prev) => [...prev, tag]);
    }
  };

  const removeFilter = (tag: string) => {
    if (filter.includes(tag)) {
      setFilter((prev) => prev.filter((v) => v !== tag));
    }
  };
  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>
        <TimerWrapper>
          <CommentTimer refetch={refetch} />
          <CommentHashTag
            addFilter={addFilter}
            removeFilter={removeFilter}
            filter={filter}
          />
        </TimerWrapper>
        {isFetching && (
          <FetchContainer>
            <Loader />
          </FetchContainer>
        )}
        <ListContainer>
          {data?.comments.map((comment) => (
            <PublicCommentsItem key={comment.comment_id} {...comment} />
          ))}
        </ListContainer>
      </Container>
    </>
  );
}

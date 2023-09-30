import styled from 'styled-components';
import Loader from 'components/common/Loader';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import PublicCommentsItem from 'components/Comments/Item/PublicCommentItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IconRefresh } from '@style/icons';
import Icon from 'components/common/Button/Icon';
import { QueryClient } from '@tanstack/react-query';

const Container = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
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
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerContainer = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: end;
  height: 32px;
`;

const TimerWord = styled.p`
  margin-right: 8px;
  line-height: 32px;
  text-justify: center;
`;

export default function CommentsPage() {
  const queryClient = new QueryClient();

  const [second, setSecond] = useState<number>(59);
  const [minute, setMinute] = useState<number>(2);

  const {
    data: comments,
    isFetching,
    isLoading,
    refetch,
  } = useCommentsListQuery();

  const refreshHandler = () => {
    setMinute(2);
    setSecond(59);
    queryClient.invalidateQueries({
      queryKey: ['USE_COMMENTS_LIST_QUERY'],
    });
    refetch();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);
      if (second === 0) {
        setSecond(60);
        setMinute((prev) => prev - 1);
      }

      if (minute === 0 && second === 0) {
        setMinute(2);
        setSecond(59);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, setSecond]);

  return (
    <>
      {!isLoading ? (
        comments?.length === 0 ? (
          <EmptyContainer>
            {`${parseInt(dayjs().format('MM'))}`}월에 등록된 한줄평이 아직
            없어요.
          </EmptyContainer>
        ) : (
          <Container>
            <TimerContainer>
              <TimerWord>
                {minute}분{second}초 후에 새로고침 됩니다.
              </TimerWord>
              <Icon icon={<IconRefresh />} onClick={refreshHandler}>
                refresh
              </Icon>
            </TimerContainer>
            {isFetching && (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            )}
            {comments?.map((comment) => (
              <PublicCommentsItem key={comment.comment_id} {...comment} />
            ))}
          </Container>
        )
      ) : (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      )}
    </>
  );
}

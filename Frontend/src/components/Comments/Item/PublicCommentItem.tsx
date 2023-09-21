import useToastHook from '@hooks/useToastHook';
import useCommentsLikeDeleteMutation from '@queries/comments/useCommentsLikeDeleteMutation';
import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useCommentsLikeMutation from '@queries/comments/useCommentsLikeMutation';
import { customize } from '@style/colors';
import { IconCalendar, IconHeart, IconHeartFill, IconStar } from '@style/icons';
import Loader from 'components/common/Loader';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 1rem;
  width: 100%;
  height: auto;
  min-height: 180px;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HeaderIconContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Status = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  svg {
    margin-left: 8px;
    height: 0.8rem;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const HeartContainer = styled.div`
  height: 15%;
  width: 100%;
  display: inline-flex;
  justify-content: start;
  gap: 1rem;
  svg {
    width: 1rem;
  }
`;

const HeartIconWrapper = styled.div<{ isLiked?: boolean }>`
  height: 100%;
  width: 1rem;
  svg {
    width: 100%;
    fill: ${({ isLiked, theme }) =>
      isLiked ? customize.rose['300'] : theme.mode.typo_sub};
  }
`;

const HeartNumber = styled.p`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const DateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
`;

const HeartLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 60%;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.mode.sub};
  color: ${({ theme }) => theme.mode.typo_main};
  box-shadow: ${({ theme }) => theme.shadow.md};
  svg {
    height: 100%;
    fill: ${customize.yellow['400']};
    cursor: pointer;
  }
`;

export default function PublicCommentsItem({
  comment,
  comment_id,
  created_at,
  name,
  rating,
  title,
}: CommentsItemType) {
  const {
    data: commentsLikeArray,
    isLoading: commentsLikeLoading,
    isFetching: commentsLikeFetching,
  } = useCommentsLikeListQuery(comment_id);
  const createdTime = dayjs(created_at).format('YYYY/MM/DD HH:mm:ss');
  const { isLogged, id } = useRecoilValue(userAtom);
  const { addToast } = useToastHook();
  const {
    mutate: commentLikeRegisterMutation,
    isLoading: commentLikeMutationIsLoading,
  } = useCommentsLikeMutation(comment_id);

  const {
    mutate: commentLikeDeleteMutation,
    isLoading: commentLikeDeleteMutationIsLoading,
  } = useCommentsLikeDeleteMutation(comment_id);

  const isLiked = commentsLikeArray?.some((like) => like.users_id === id);

  const commentLikeHandler = (isLike: boolean) => {
    if (!isLogged) {
      return addToast({ message: '로그인이 필요합니다.', status: 'error' });
    }

    if (isLike) {
      commentLikeRegisterMutation(comment_id);
    } else {
      commentLikeDeleteMutation(comment_id);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfoContainer>
          <Status>{title}</Status>
          <DateWrapper>
            <IconCalendar />
            &nbsp;{createdTime}
            &nbsp;{name}
          </DateWrapper>
        </HeaderInfoContainer>
        <HeaderIconContainer>
          <IconBox>
            <IconStar />
            <RatingBox>{rating}</RatingBox>
          </IconBox>
        </HeaderIconContainer>
      </Header>
      <Content>{comment}</Content>
      <HeartContainer>
        {commentsLikeLoading || commentsLikeFetching ? (
          <HeartLoaderContainer>
            <Loader />
          </HeartLoaderContainer>
        ) : (
          <>
            <HeartIconWrapper isLiked={isLiked}>
              {!commentLikeMutationIsLoading ||
              !commentLikeDeleteMutationIsLoading ? (
                isLiked ? (
                  <IconHeartFill onClick={() => commentLikeHandler(false)} />
                ) : (
                  <IconHeart onClick={() => commentLikeHandler(true)} />
                )
              ) : (
                <Loader />
              )}
            </HeartIconWrapper>
            <HeartNumber>{commentsLikeArray?.length}</HeartNumber>
          </>
        )}
      </HeartContainer>
    </Container>
  );
}
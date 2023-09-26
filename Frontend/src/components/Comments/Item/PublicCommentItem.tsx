import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import useToastHook from '@hooks/useToastHook';
import useCommentsLikeDeleteMutation from '@queries/comments/useCommentsLikeDeleteMutation';
import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useCommentsLikeMutation from '@queries/comments/useCommentsLikeMutation';
import { customize } from '@style/colors';
import { IconCalendar, IconHeart, IconHeartFill, IconStar } from '@style/icons';
import Loader from 'components/common/Loader';
import Avatar from 'components/common/Avatar';
import { userAtom } from 'recoil/user';

const Container = styled.li`
  box-sizing: border-box;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 70%;
`;

const HeaderInfoContainerTitleWrapper = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const HeaderInfoContainerDateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const HeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 30%;
`;

const HeaderIconContainerRating = styled.div`
  display: flex;
  height: 100%;
  gap: 8px;
  align-items: center;
  svg {
    height: 1.5rem;
    fill: ${customize.yellow['300']};
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: 95px;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Bottom = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: start;
  gap: 1rem;
  svg {
    width: 1rem;
  }
`;

const BottomLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
`;

const HeartNumber = styled.p`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const HeartIconWrapper = styled.div<{ isLiked?: boolean }>`
  height: 100%;
  width: 1rem;
  cursor: pointer;
  svg {
    width: 100%;
    fill: ${({ isLiked, theme }) =>
      isLiked ? customize.rose['300'] : theme.mode.typo_sub};
  }
`;

export default function PublicCommentsItem({
  comment,
  comment_id,
  created_at,
  name,
  rating,
  title,
  profile,
}: CommentsItemType) {
  const {
    data: commentsLikeArray,
    isLoading: commentsLikeLoading,
    isFetching: commentsLikeFetching,
  } = useCommentsLikeListQuery(comment_id);
  const createdTime = dayjs(created_at).format('YYYY/MM/DD');
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
          <HeaderInfoContainerTitleWrapper>
            {title}
          </HeaderInfoContainerTitleWrapper>
          <HeaderInfoContainerDateWrapper>
            <IconCalendar />
            &nbsp;{createdTime}
            &nbsp;{name}
          </HeaderInfoContainerDateWrapper>
        </HeaderInfoContainer>
        <HeaderIconContainer>
          <HeaderIconContainerRating>
            <IconStar />
            {rating}
          </HeaderIconContainerRating>
          <Avatar src={profile} size="2.5rem" />
        </HeaderIconContainer>
      </Header>
      <Content>{comment}</Content>
      <Bottom>
        {commentsLikeLoading || commentsLikeFetching ? (
          <BottomLoaderContainer>
            <Loader />
          </BottomLoaderContainer>
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
      </Bottom>
    </Container>
  );
}

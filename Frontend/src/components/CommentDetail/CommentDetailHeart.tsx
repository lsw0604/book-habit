import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import useToastHook from '@hooks/useToastHook';
import useCommentsLikeDeleteMutation from '@queries/comments/useCommentsLikeDeleteMutation';
import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useCommentsLikeRegisterMutation from '@queries/comments/useCommentsLikeRegisterMutation';
import { customize } from '@style/colors';
import { IconHeart, IconHeartFill } from '@style/icons';
import { userAtom } from 'recoil/user';
import Loader from 'components/common/Loader';

interface IProps {
  comment_id: number;
}

const Container = styled.div`
  height: 18px;
  width: 50px;
  display: inline-flex;
  gap: 1rem;
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

export default function CommentDetailHeart({ comment_id }: IProps) {
  const { isLogged, id } = useRecoilValue(userAtom);
  const { addToast } = useToastHook();

  const {
    mutate: commentLikeRegisterMutation,
    isLoading: commentLikeMutationIsLoading,
  } = useCommentsLikeRegisterMutation(comment_id);

  const {
    mutate: commentLikeDeleteMutation,
    isLoading: commentLikeDeleteMutationIsLoading,
  } = useCommentsLikeDeleteMutation(comment_id);

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
  const {
    data: commentsLikeArray,
    isLoading: commentsLikeLoading,
    isFetching: commentsLikeFetching,
  } = useCommentsLikeListQuery(comment_id);

  const isLiked = commentsLikeArray?.some((like) => like.users_id === id);

  return (
    <Container>
      {commentsLikeLoading || commentsLikeFetching ? (
        <Loader />
      ) : (
        <>
          <HeartIconWrapper isLiked={isLiked}>
            {commentLikeMutationIsLoading ||
            commentLikeDeleteMutationIsLoading ? (
              <Loader />
            ) : isLiked ? (
              <IconHeartFill onClick={() => commentLikeHandler(false)} />
            ) : (
              <IconHeart onClick={() => commentLikeHandler(true)} />
            )}
          </HeartIconWrapper>
          <HeartNumber>{commentsLikeArray?.length}</HeartNumber>
        </>
      )}
    </Container>
  );
}

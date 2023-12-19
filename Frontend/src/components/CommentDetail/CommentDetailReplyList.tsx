import styled from 'styled-components';

import Loader from 'components/common/Loader';
import CommentDetailReplyItem from 'components/CommentDetail/CommentDetailReplyItem';
import CommentDetailSkeleton from 'components/CommentDetail/CommentDetailSkeleton';

import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';

interface IProps {
  comment_id: number;
}

const Container = styled.ul`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.mode.sub};
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EMPTY_MESSAGE = '아직 등록된 댓글이 없습니다.';
const LOADING_MESSAGE = '댓글을 불러오는 중입니다.';
const SKELETON_HEIGHT = '13rem';

export default function CommentDetailReplyList({ comment_id }: IProps) {
  const { data, isLoading, isFetching } = useCommentsReplyListQuery(comment_id);

  if (!data) return null;

  const { reply_list } = data;

  if (isLoading)
    return (
      <CommentDetailSkeleton
        isLoading
        height={SKELETON_HEIGHT}
        message={LOADING_MESSAGE}
      />
    );

  if (reply_list.length === 0)
    return (
      <CommentDetailSkeleton height={SKELETON_HEIGHT} message={EMPTY_MESSAGE} />
    );

  return (
    <Container>
      {reply_list.map((reply) => (
        <CommentDetailReplyItem key={reply.reply_id} {...reply} />
      ))}
      {isFetching ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : null}
    </Container>
  );
}

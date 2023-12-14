import CommentTimer from 'components/Comments/CommentTimer';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';
import CommentFilterProvider from 'components/Comments/CommentFilterProvider';

export default function CommentsPage() {
  const { filter } = useCommentsPageHook();
  const { refetch } = useCommentsListQuery(filter);

  return (
    <CommentFilterProvider>
      <CommentTimer refetch={refetch} />
    </CommentFilterProvider>
  );
}

import CommentTimer from 'components/Comments/CommentTimer';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';
import CommentFilterProvider from 'components/Comments/CommentFilterProvider';
import HelmetProvider from 'components/common/HelmetProvider';

export default function CommentsPage() {
  const { filter } = useCommentsPageHook();
  const { refetch } = useCommentsListQuery(filter);

  return (
    <HelmetProvider
      title="한줄평"
      description="한줄평을 보여주는 페이지입니다."
    >
      <CommentFilterProvider>
        <CommentTimer refetch={refetch} />
      </CommentFilterProvider>
    </HelmetProvider>
  );
}

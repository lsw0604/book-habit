import CommentsTimer from 'components/Comments/CommentsTimer';
import CommentsFilterProvider from 'components/Comments/CommentsFilterProvider';
import HelmetProvider from 'components/common/HelmetProvider';

import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';

export default function CommentsPage() {
  const { filter } = useCommentsPageHook();
  const { refetch } = useCommentsListQuery(filter);

  return (
    <HelmetProvider
      title="한줄평"
      description="한줄평을 보여주는 페이지입니다."
    >
      <CommentsFilterProvider>
        <CommentsTimer refetch={refetch} />
      </CommentsFilterProvider>
    </HelmetProvider>
  );
}

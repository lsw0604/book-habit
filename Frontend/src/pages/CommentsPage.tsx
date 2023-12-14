import CommentTimer from 'components/Comments/CommentTimer';
// import HelmetProvider from 'components/common/HelmetProvider';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';
import CommentFilterProvider from 'components/Comments/CommentFilterProvider';

// const HELMET_PROVIDER_OPTIONS = {
//   title: '한줄평',
//   description:
//     '척벌래 이용하는 유저들이 공개 등록한 한줄평을 보여주는 페이지입니다.',
// };

export default function CommentsPage() {
  const { filter } = useCommentsPageHook();
  const { refetch } = useCommentsListQuery(filter);

  return (
    <>
      {/* <HelmetProvider {...HELMET_PROVIDER_OPTIONS} /> */}
      <CommentFilterProvider>
        <CommentTimer refetch={refetch} />
      </CommentFilterProvider>
    </>
  );
}

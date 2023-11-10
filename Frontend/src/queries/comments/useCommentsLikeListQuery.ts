import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { commentsLikeListAPI } from 'lib/api/comments';

const REACT_QUERY_KEY = 'USE_COMMENTS_LIKE_LIST_QUERY';

export default function useCommentsLikeListQuery(
  comment_id: CommentsLikeListRequestType
) {
  const { data, isFetching, isLoading, refetch } = useQuery<
    CommentsLikeListQueryResponseType,
    AxiosError,
    CommentsLikeListType
  >([REACT_QUERY_KEY, comment_id], () => commentsLikeListAPI(comment_id), {
    select: ({ comment_likes }) => {
      return comment_likes;
    },
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}

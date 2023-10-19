import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useProfileLikeQuery from '@queries/profile/useProfileLikeQuery';
import { commentsLikeDeleteAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';

export default function useCommentsLikeDeleteMutation(
  comment_id: CommentsLikeDeleteMutationRequestType
) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_LIKE_DELETE_MUTATION';
  const queryClient = new QueryClient();

  const { refetch: profileLikeQueryRefetch } = useProfileLikeQuery(1);
  const { refetch: commentsLikeListRefetch } =
    useCommentsLikeListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, isLoading, isError, error, isSuccess, mutate } = useMutation<
    CommentsLikeDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeDeleteMutationRequestType
  >([REACT_QUERY_KEY, comment_id], commentsLikeDeleteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_LIKE_LIST_QUERY', comment_id],
      });
      commentsLikeListRefetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries({
        queryKey: ['USE_PROFILE_LIKE_QUERY'],
      });
      profileLikeQueryRefetch();
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}

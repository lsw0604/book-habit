import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useProfileLikeQuery from '@queries/profile/useProfileLikeQuery';
import { commentsLikeRegisterAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';

const REACT_QUERY_KEY = 'USE_COMMENTS_LIKE_MUTATION';

export default function useCommentsLikeMutation(
  comment_id: CommentsLikeMutationRequestType
) {
  const queryClient = new QueryClient();

  const { refetch: profileLikeQueryRefetch } = useProfileLikeQuery(1);
  const { refetch: commentsLikeListRefetch } =
    useCommentsLikeListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsLikeMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeMutationRequestType
  >([REACT_QUERY_KEY, comment_id], commentsLikeRegisterAPI, {
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

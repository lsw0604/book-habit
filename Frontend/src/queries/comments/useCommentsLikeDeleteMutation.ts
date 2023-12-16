import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import useProfileLikeQuery from '@queries/profile/useProfileLikeQuery';
import { commentsLikeDeleteAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';

const { profile, comments } = queriesKey;

export default function useCommentsLikeDeleteMutation(
  comment_id: CommentsLikeDeleteMutationRequestType
) {
  const queryClient = new QueryClient();

  const { refetch: profileLikeQueryRefetch } = useProfileLikeQuery(1);
  const { refetch: commentsLikeListRefetch } =
    useCommentsLikeListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, isLoading, isError, error, isSuccess, mutate } = useMutation<
    CommentsLikeDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeDeleteMutationRequestType
  >(
    [comments.useCommentsLikeDeleteMutationKey, comment_id],
    commentsLikeDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [comments.useCommentsLikeListQueryKey, comment_id],
        });
        commentsLikeListRefetch();
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries({
        queryKey: [profile.useProfileLikeQueryKey],
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

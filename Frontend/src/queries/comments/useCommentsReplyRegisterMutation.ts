import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';
import useProfileReplyQuery from '@queries/profile/useProfileReplyQuery';
import { commentsReplyRegisterAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';

const { comments, profile } = queriesKey;

export default function useCommentsReplyRegisterMutation(
  comment_id: CommentsReplyMutationRequestType['comment_id']
) {
  const queryClient = new QueryClient();

  const { refetch: profileReplyQueryRefetch } = useProfileReplyQuery(1);
  const { refetch: commentsReplyListRefetch } =
    useCommentsReplyListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyMutationRequestType
  >(
    [comments.useCommentsReplyRegisterMutationKey, comment_id],
    commentsReplyRegisterAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [comments.useCommentsReplyListQueryKey, comment_id],
        });
        commentsReplyListRefetch();
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries({
        queryKey: [profile.useProfileReplyQueryKey],
      });
      profileReplyQueryRefetch();
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

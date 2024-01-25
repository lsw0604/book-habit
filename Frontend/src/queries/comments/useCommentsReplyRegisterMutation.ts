import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsReplyRegisterAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const {
  useCommentsReplyListQueryKey,
  useCommentsReplyRegisterMutationKey,
  useCommentsDetailQueryKey,
  useCommentsListQueryKey,
} = queriesKey.comments;

export default function useCommentsReplyRegisterMutation(
  comment_id: CommentsReplyMutationRequestType['comment_id']
) {
  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyMutationRequestType
  >(
    [useCommentsReplyRegisterMutationKey, comment_id],
    commentsReplyRegisterAPI,
    {
      onSuccess: (response) => {
        const commentsListData =
          queryClient.getQueryData<CommentsListQueryResponseType>([
            useCommentsListQueryKey,
          ]);
        const commentDetailData =
          queryClient.getQueryData<CommentsDetailQueryResponseType>([
            useCommentsDetailQueryKey,
            comment_id,
          ]);

        if (commentsListData) {
          const synthesizedCommentsListData = commentsListData?.comments.map(
            (comment) => {
              if (comment.comment_id === comment_id) {
                const newComment: CommentsItemType = {
                  ...comment,
                  reply_ids: [
                    ...comment.reply_ids,
                    { reply_id: response.reply_id },
                  ],
                };

                return newComment;
              }
              return comment;
            }
          );
          queryClient.setQueryData([useCommentsListQueryKey], {
            comments: synthesizedCommentsListData,
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: [useCommentsListQueryKey],
          });
        }

        if (commentDetailData) {
          const synthesizedCommentDetailData: CommentsItemType = {
            ...commentDetailData,
            reply_ids:
              commentDetailData.reply_ids.length !== 0
                ? [
                    ...commentDetailData.reply_ids,
                    { reply_id: response.reply_id },
                  ]
                : [{ reply_id: response.reply_id }],
          };

          queryClient.setQueryData(
            [useCommentsDetailQueryKey, comment_id],
            synthesizedCommentDetailData
          );
        } else {
          queryClient.invalidateQueries({
            queryKey: [useCommentsDetailQueryKey, comment_id],
          });
        }

        queryClient.invalidateQueries({
          queryKey: [useCommentsReplyListQueryKey, comment_id],
        });
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
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
    isSuccess,
  };
}

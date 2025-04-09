import { ReviewComment } from '@prisma/client';

export interface CreateReviewCommentPayload
  extends Pick<ReviewComment, 'comment' | 'userId' | 'myBookReviewId'> {}
export interface GetReviewCommentByIdPayload extends Pick<ReviewComment, 'id'> {}
export interface UpdateReviewCommentPayload
  extends Pick<ReviewComment, 'id' | 'userId' | 'comment'> {}
export interface DeleteReviewCommentPayload extends Pick<ReviewComment, 'id' | 'userId'> {}
export interface ValidateReviewCommentPayload extends Pick<ReviewComment, 'id' | 'userId'> {}

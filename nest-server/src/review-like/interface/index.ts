import { ReviewLike } from '@prisma/client';

interface ReviewLikePayload {
  userId: number;
  myBookReviewId: number;
}

type ResponseReviewLike = {
  reviewLike: ReviewLike;
};

export interface CreateReviewLikePayload extends ReviewLikePayload {}
export interface DeleteReviewLikePayload extends ReviewLikePayload {}

export type ResponseCreateReviewLike = ResponseReviewLike;
export type ResponseDeleteReviewLike = ResponseReviewLike;

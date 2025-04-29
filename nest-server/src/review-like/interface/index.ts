import { ReviewLike } from '@prisma/client';

export interface ToggleReviewLikePayload {
  userId: number;
  myBookReviewId: number;
}

export type ResponseToggleReviewLike = {
  reviewLike: ReviewLike;
  action: 'deleted' | 'created';
};

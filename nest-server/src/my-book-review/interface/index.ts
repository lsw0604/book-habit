import { MyBookReview } from '@prisma/client';

export interface FormattedMyBookReview extends MyBookReview {
  _count: {
    reviewLike: number;
    reviewComment: number;
  };
}

export interface CreateMyBookReviewPayload {
  id: number;
  userId: number;
  review: string;
  isPublic: boolean;
}

export interface GetMyBookReviewPayload {
  id: number;
  userId: number;
}

export interface UpdateMyBookReviewPayload {
  id: number;
  userId: number;
  isPublic?: boolean;
  review?: string;
}

export interface DeleteMyBookReviewPayload {
  id: number;
  userId: number;
}
export interface DeleteMyBooKReviewResponse {
  id: number;
}

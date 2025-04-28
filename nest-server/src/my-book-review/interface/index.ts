import { MyBookReview } from '@prisma/client';

export interface FormattedMyBookReview extends MyBookReview {
  _count: {
    reviewLike: number;
    reviewComment: number;
  };
}

export interface CreateMyBookReviewPayload {
  userId: number;
  myBookId: number;
  review: string;
  isPublic: boolean;
}

export interface GetMyBookReviewPayload {
  userId: number;
  myBookId: number;
}

export interface UpdateMyBookReviewPayload {
  userId: number;
  myBookReviewId: number;
  isPublic?: boolean;
  review?: string;
}

export interface DeleteMyBookReviewPayload {
  userId: number;
  myBookReviewId: number;
}
export type DeleteMyBookReviewResponse = {
  myBookReviewId: number;
};

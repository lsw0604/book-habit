import { MyBookReview, Prisma } from '@prisma/client';
import { MY_BOOK_REVIEW_SELECT_WITH_USER_ID } from '../constants';

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

export type MyBookReviewWithUserId = Prisma.MyBookReviewGetPayload<{
  select: typeof MY_BOOK_REVIEW_SELECT_WITH_USER_ID;
}>;

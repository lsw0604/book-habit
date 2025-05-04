import { Prisma } from '@prisma/client';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { PUBLIC_REVIEWS_INCLUDE_BASIC } from '../constant';

export interface GetPublicReviewsPayload {
  pageNumber: number;
  startDate: Date;
  endDate: Date;
  tags: string;
  currentUserId?: number;
}

export interface FormattedPublicReviews {
  reviews: FormattedPublicReview[];
  meta: PaginationMeta;
}

export interface FormattedPublicReview {
  id: number;
  rating: number;
  review: string;
  user: {
    email: string;
    name: string;
    profile: string;
  };
  book: {
    title: string;
    thumbnail: string;
  };
  tags: string[];
  _count: {
    reviewLike: number;
    reviewComment: number;
  };
  isLike: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicReviewWithLike = Prisma.MyBookReviewGetPayload<{
  include: typeof PUBLIC_REVIEWS_INCLUDE_BASIC;
}>;

export const PUBLIC_REVIEWS_INCLUDE_BASIC = {
  myBook: {
    select: {
      rating: true,
      tag: {
        select: {
          tag: {
            select: {
              value: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          profile: true,
          email: true,
        },
      },
      book: {
        select: {
          title: true,
          thumbnail: true,
        },
      },
    },
  },
  _count: {
    select: {
      reviewComment: true,
      reviewLike: true,
    },
  },
  reviewLike: {
    select: {
      userId: true,
    },
  },
} as const;

export const PUBLIC_REVIEW_PAGE_SIZE = 10;

export const PUBLIC_REVIEW_CONTROLLER_MESSAGE = {
  PUBLIC_REVIEWS: '리뷰 목록 조회 성공',
  PUBLIC_REVIEW: '리뷰 조회 성공',
} as const;

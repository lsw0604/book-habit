export const MY_BOOK_REVIEW_SELECT_WITH_COUNTS = {
  id: true,
  myBookId: true,
  review: true,
  isPublic: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      reviewComment: true,
      reviewLike: true,
    },
  },
} as const;

export const MY_BOOK_REVIEW_SELECT_WITH_USER_ID = {
  myBook: {
    select: {
      userId: true,
    },
  },
} as const;

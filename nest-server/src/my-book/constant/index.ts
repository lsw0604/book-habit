export const MY_BOOK_INCLUDE_BOOK_DETAILS = {
  book: {
    select: {
      title: true,
      thumbnail: true,
      contents: true,
      publisher: true,
      datetime: true,
      url: true,
      authors: { select: { author: { select: { name: true } } } },
      translators: { select: { translator: { select: { name: true } } } },
    },
  },
} as const;

export const MY_BOOK_INCLUDE_BOOK_BASIC = {
  book: {
    select: {
      title: true,
      thumbnail: true,
    },
  },
} as const;

export const MY_BOOK_PAGE_SIZE: number = 10;

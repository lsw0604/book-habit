import { Prisma } from '@prisma/client';

export type MyBookWithBook = Prisma.MyBookGetPayload<{
  include: { book: true };
}>;

export type MyBooksWithBook = Prisma.MyBookGetPayload<{
  select: typeof myBookListSelect;
}>;

export const myBookListSelect = {
  id: true,
  status: true,
  rating: true,
  startDate: true,
  currentPage: true, // UI 진행률용
  book: {
    select: {
      id: true,
      title: true,
      thumbnail: true,
      author: true,
      totalPage: true, // UI 진행률용
    },
  },
} satisfies Prisma.MyBookSelect;

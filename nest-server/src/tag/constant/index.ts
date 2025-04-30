import { Prisma } from '@prisma/client';

export const TAG_SELECT_OPTION: Prisma.TagSelect = {
  id: true,
  value: true,
  _count: {
    select: {
      myBookTag: true,
    },
  },
} as const;

export const POPULAR_TAG_ORDERBY_OPTION: Prisma.TagOrderByWithRelationInput = {
  myBookTag: {
    _count: 'desc',
  },
} as const;

export const SEARCH_TAG_ORDERBY_OPTION: Prisma.TagOrderByWithRelationInput[] = [
  { myBookTag: { _count: 'desc' } },
  { value: 'asc' },
] as const;

export const PUBLIC_POPULAR_TAG_WHERE_OPTION: Prisma.TagWhereInput = {
  myBookTag: {
    some: {
      myBook: {
        review: {
          is: {
            isPublic: true,
          },
        },
      },
    },
  },
} as const;

export const PUBLIC_POPULAR_TAG_SELECT_OPTION: Prisma.TagSelect = {
  id: true,
  value: true,
  _count: {
    select: {
      myBookTag: {
        where: {
          myBook: {
            review: {
              is: {
                isPublic: true,
              },
            },
          },
        },
      },
    },
  },
} as const;

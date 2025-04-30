import { Prisma } from '@prisma/client';
import { PUBLIC_POPULAR_TAG_SELECT_OPTION, TAG_SELECT_OPTION } from '../constant';

export interface SearchTagPayload {
  query: string;
  limit: number;
}

export type FormattedTag = {
  id: number;
  value: string;
  count: number;
};

export type TagWithCount = Prisma.TagGetPayload<{
  select: typeof TAG_SELECT_OPTION;
}>;

export type PublicTagWithCount = Prisma.TagGetPayload<{
  select: typeof PUBLIC_POPULAR_TAG_SELECT_OPTION;
}>;

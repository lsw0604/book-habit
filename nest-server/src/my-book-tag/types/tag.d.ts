import { Tag } from '@prisma/client';

export type CreateTagPayload = Pick<Tag, 'tag'>;
export type FindTagPayload = Partial<Tag>;
export type DeleteTagPayload = Pick<Tag, 'id'>;

import { Tag, MyBook, MyBookTag } from '@prisma/client';

export type CreateMyBookTagPayload = Pick<Tag, 'tag'> & Pick<MyBook, 'id' | 'userId'>;
export type GetMyBookTagPayload = Pick<MyBookTag, 'id'>;
export type DeleteMyBookTagPayload = Pick<MyBookTag, 'id'> & Pick<MyBook, 'userId'>;
export type ExistingMyBookTagPayload = Pick<MyBookTag, 'myBookId' | 'tagId'>;

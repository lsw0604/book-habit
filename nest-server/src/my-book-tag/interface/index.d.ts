import { MyBook, MyBookTag, Tag } from '@prisma/client';

export interface CreateMyBookTagPayload extends Pick<Tag, 'tag'>, Pick<MyBook, 'id' | 'userId'> {}
export interface GetMyBookTagPayload extends Pick<MyBookTag, 'id'> {}
export interface DeleteMyBookTagPayload extends Pick<MyBookTag, 'id'>, Pick<MyBook, 'userId'> {}

import { MyBook, MyBookHistory } from '@prisma/client';

export interface CreateMyBookHistoryPayload
  extends Pick<MyBookHistory, 'date' | 'page' | 'myBookId'>,
    Pick<MyBook, 'userId'> {}
export interface GetMyBookHistoryListPayload extends Pick<MyBook, 'id'> {}
export interface GetMyBookHistoryPayload extends Pick<MyBookHistory, 'id'> {}
export interface UpdateMyBookHistoryPayload
  extends Partial<Pick<MyBookHistory, 'page' | 'date'>>,
    Pick<MyBookHistory, 'id'>,
    Pick<MyBook, 'userId'> {}
export interface deleteMyBookHistoryPayload
  extends Pick<MyBookHistory, 'id'>,
    Pick<MyBook, 'userId'> {}

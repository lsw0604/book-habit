type CreateMyBookHistoryPayload = Pick<MyBookHistory, 'date' | 'page' | 'myBookId'> &
  Pick<MyBook, 'userId'>;
type GetMyBookHistoryListPayload = Pick<MyBook, 'id'>;
type GetMyBookHistoryPayload = Pick<MyBookHistory, 'id'>;
type UpdateMyBookHistoryPayload = Partial<Pick<MyBookHistory, 'page' | 'date'>> &
  Pick<MyBookHistory, 'id'> &
  Pick<MyBook, 'userId'>;
type deleteMyBookHistoryPayload = Pick<MyBookHistory, 'id'> & Pick<MyBook, 'userId'>;

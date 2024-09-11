type MyBookStatusAndPageNumberType = {
  myBookStatus: MyBookStatus | 'ALL';
  pageNumber: number;
  orderBy: 'desc' | 'asc';
};

type GetMyBookListPayload = Pick<MyBook, 'userId'> & MyBookStatusAndPageNumberType;
type GetMyBookDetailPayload = Pick<MyBook, 'id' | 'userId'>;
type GetMyBookPayload = Pick<MyBook, 'id'>;
type ValidateMyBookPayload = Pick<MyBook, 'id' | 'userId'>;
type DuplicateMyBookPayload = Pick<MyBook, 'bookId' | 'userId'>;

type BookIdAndUserIdType = Pick<MyBook, 'bookId' | 'userId'>;
type IdAndUserIdType = Pick<MyBook, 'id' | 'userId'>;
type MyBookStatusAndPageNumberType = {
  myBookStatus: MyBookStatus | 'ALL';
  pageNumber: number;
};

type CreateMyBookPayload = BookIdAndUserIdType;
type GetMyBookListPayload = Pick<MyBook, 'userId'> & MyBookStatusAndPageNumberType;
type GetMyBookDetailPayload = IdAndUserIdType;
type GetMyBookPayload = Pick<MyBook, 'id'>;
type UpdateMyBookPayload = IdAndUserIdType & Partial<Pick<MyBook, 'rating' | 'myBookStatus'>>;
type DeleteMyBookPayload = IdAndUserIdType;
type ValidateMyBookPayload = IdAndUserIdType;
type DuplicateMyBookPayload = BookIdAndUserIdType;

type MutationResponse = {
  message: string;
  status: 'error' | 'info' | 'success' | 'warning' | '';
};

// useMyBookExistQuery의 타입들
type MyBookExistQueryResponseType = {
  status: '등록' | '미등록';
};
type MyBookExistQueryRequestType = string;

// useMyBookCommentDeleteMutation의 타입들
type MyBookCommentDeleteMutationResponseType = MutationResponse;
type MyBOokCommentDeleteMutationRequestType = number;

// useMyBookHistoryDeleteMutation의 타입들
type MyBookHistoryDeleteMutationResponseType = MutationResponse;
type MyBookHistoryDeleteMutationRequestType = number;

// useMyBookRatingDeleteMutation의 타입들
type MyBookRatingDeleteMutationResponseType = MutationResponse;
type MyBookRatingDeleteMutationRequestType = number;

// useMyBookListInfinityQuery의 타입들
type MyBookListInfinityQueryResponseType = {
  nextPage: number;
  books: MyBookListInfinityQueryItemType[];
};

type MyBookListInfinityQueryItemType = Pick<
  BooksType,
  'isbn' | 'image' | 'title'
> & {
  id: number;
  status: '다읽음' | '읽기시작함' | '읽고싶음' | '읽는중';
  date: string;
};

// useMyBookRatingMutation의 타입들
type MyBookRatingMutationResponseType = MutationResponse;
type MyBookRatingMutationRequestType = Pick<
  MyBookHistoryMutationRequestType,
  'users_books_id'
> & {
  rating: number;
  status: '읽기전' | '다읽음' | '읽는중';
};

// useMyBookHistoryMutation의 타입들
type MyBookHistoryMutationResponseType = MutationResponse;
type MyBookHistoryMutationRequestType = {
  status: '다읽음' | '읽는중' | '읽기시작함';
  date: Date;
  users_books_id: number;
  page?: number | undefined;
};

// useMyBookListDeleteMutation의 타입들
type MyBookListDeleteMutationResponseType = MutationResponse;
type MyBookListDeleteMutationRequestType = number;

// useMyBookCommentMutation의 타입들

type MyBookCommentMutationResponseType = MutationResponse;
type MyBookCommentMutationRequestType = {
  comment: string;
  users_books_id: number;
};

// useMyBookPageQueries의 타입들

// myBook INFO
type MyBookPageQueriesInfoResponseType = {
  result: MyBookPageQueriesInfoResultType;
};

type MyBookPageQueriesInfoResultType = {
  title: string;
  image?: string;
  url: string;
  contents: string;
};

type MyBookPageQueriesInfoRequestType = number;

// history LIST
type MyBookPageQueriesHistoryListResponseType = {
  books: MyBookPageQueriesHistoryListType;
};
type MyBookPageQueriesHistoryListType = MyBookPageQueriesHistoryItemType[];

type MyBookPageQueriesHistoryItemType = {
  id: number;
  status: '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';
  date: string;
  page: number | null;
  created_at: string;
  updated_at: string | null;
};
type MyBookPageQueriesHistoryListRequestType = number;

// rating LIST

type MyBookPageQueriesRatingListResponseType = {
  result: MyBookPageQueriesRatingListType;
};
type MyBookPageQueriesRatingListType = MyBookPageQueriesRatingItemType[];
type MyBookPageQueriesRatingItemType = {
  id: number;
  status: '다읽음' | '읽는중' | '읽기전';
  created_at: string;
  rating: number;
};
type MyBookPageQueriesRatingListRequestType = number;

// myBook TIME

type MyBookPageQueriesTimeRangeResponseType = {
  startDate?: string;
  endDate?: string;
};

type MyBookPageQueriesTimeRangeRequestType = number;

// myBook Comments

type MyBookPageQueriesCommentResponseType = {
  comments: MyBookPageQueriesCommentListType;
};
type MyBookPageQueriesCommentListType = MyBookPageQueriesCommentItemType[];
type MyBookPageQueriesCommentItemType = {
  comment_id: number;
  comment: string;
  created_at: string;
  updated_at?: string;
};
type MyBookPageQueriesCommentRequestType = number;

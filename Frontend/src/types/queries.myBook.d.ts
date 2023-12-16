type MutationResponse = {
  message: string;
  status: 'error' | 'info' | 'success' | 'warning' | '';
};

// useMyBookCommentListQuery의 타입들

type MyBookCommentQueryResponseType = {
  comments: MyBookCommentQueryListType;
};
type MyBookCommentQueryListType = MyBookCommentQueryItemType[];
type MyBookCommentQueryItemType = {
  comment_id: number;
  comment: string;
  comment_is_open: boolean;
  status: '읽는중' | '읽기전' | '다읽음';
  rating: number;
  created_at: string;
  updated_at?: string;
};
type MyBookCommentQueryRequestType = number;

// useMyBookCommentDeleteMutation의 타입들
type MyBookCommentDeleteMutationResponseType = MutationResponse;
type MyBookCommentDeleteMutationRequestType = number;

// useMyBookHistoryDeleteMutation의 타입들
type MyBookHistoryDeleteMutationResponseType = MutationResponse;
type MyBookHistoryDeleteMutationRequestType = number;

// useMyBookListInfinityQuery의 타입들
type MyBookListInfinityQueryResponseType = {
  nextPage: number;
  books: MyBookListInfinityQueryItemType[];
};

type MyBookListInfinityQueryItemType = Pick<
  BooksType,
  'isbn' | 'thumbnail' | 'title'
> & {
  id: number;
  status?: '다읽음' | '읽기시작함' | '읽고싶음' | '읽는중';
  date?: string;
};

// useMyBookCommentUpdateMutation의 타입들
type MyBookCommentUpdateMutationResponseType = MutationResponse;
type MyBookCommentUpdateMutationRequestType = {
  comment_id: MyBookCommentUpdateMutationCommentIdType;
  body: MyBookCommentUpdateMutationBodyType;
};
type MyBookCommentUpdateMutationCommentIdType = number;
type MyBookCommentUpdateMutationBodyType = {
  rating: number;
  comment: string;
};

// useMyBookHistoryRegisterMutation의 타입들
type MyBookHistoryMutationResponseType = MutationResponse;
type MyBookHistoryMutationRequestType = {
  status: '다읽음' | '읽는중' | '읽기시작함';
  date: Date;
  users_books_id: number;
};

// useMyBookListDeleteMutation의 타입들
type MyBookListDeleteMutationResponseType = MutationResponse;
type MyBookListDeleteMutationRequestType = number;

// useMyBookCommentMutation의 타입들

type MyBookCommentMutationResponseType = MutationResponse;
type MyBookCommentMutationRequestType = {
  status: string;
  rating: number;
  comment: string;
  comment_is_open: boolean;
  users_books_id: number;
};

// useMyBookPageQueries의 타입들

// myBook INFO
type MyBookPageQueriesInfoResponseType = {
  result: MyBookPageQueriesInfoResultType;
};

type MyBookPageQueriesInfoResultType = {
  title: string;
  thumbnail?: string;
  url: string;
  contents: string;
  publisher: string;
  authors: string;
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

// myBook TIME

type MyBookPageQueriesTimeRangeResponseType = {
  startDate?: string;
  endDate?: string;
};

type MyBookPageQueriesTimeRangeRequestType = number;

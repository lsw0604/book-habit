type MyBookAtomType = {
  isExist: boolean;
};

type RegisterResponse = {
  message: string;
  status: 'error' | 'info' | 'success' | 'warning' | '';
};

// MyBookTimeRange와 관련된 타입들
type MyBookTimeRangeResponseType = {
  startDate?: string;
  endDate?: string;
};

type MyBookTimeRangeRequestType = number;

// MyBookExist과 관련된 타입들
type MyBookExistResponseType = {
  status: '등록' | '미등록';
};
type MyBookExistRequestType = string;

// MyBookRating과 관련된 타입들
type MyBookRatingResponseType = {
  result: MyBookRatingListType;
};
type MyBookRatingListType = MyBookRatingItemType[];
type MyBookRatingItemType = {
  id: number;
  status: '다읽음' | '읽는중' | '읽기전';
  created_at: string;
  rating: number;
};
type MyBookRatingRequestType = number;

// useMyBookHistoryDelete와 관련된 타입들
type MyBookHistoryDeleteResponseType = RegisterResponse;
type MyBookHistoryDeleteRequestType = number;

// MyBookRatingDelete와 관련된 타입들
type MyBookRatingDeleteResponseType = RegisterResponse;
type MyBookRatingDeleteRequestType = number;

// MyBookListDelete와 관련된 타입들
type MyBookListDeleteResponseType = {
  message: string;
  status: string;
};
type MyBookListDeleteRequestType = number;

// MyBookInfo와 관련된 타입들
type MyBookInfoResponseType = {
  result: {
    title: string;
    image?: string;
    url: string;
    contents: string;
  };
};
type MyBookInfoRequestType = number;

// MyBookList와 관련된 타입들
type MyBookListResponseType = {
  nextPage: number;
  books: MyBookItemType[];
};

type MyBookItemType = Pick<BooksType, 'isbn' | 'image' | 'title'> & {
  id: number;
  status: '다읽음' | '읽기시작함' | '읽고싶음' | '읽는중';
  date: string;
};

// MyBookHistory와 관련된 타입들
type MyBookHistoryListResponseType = {
  books: MyBookHistorySelectType;
};
type MyBookHistorySelectType = MyBookHistoryItemType[];

type MyBookHistoryItemType = {
  id: number;
  status: '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';
  date: string;
  page: number | null;
  created_at: string;
  updated_at: string | null;
};
type MyBookHistoryListRequestType = number;

// useMyBookAddFormRatingRegister와 관련된 타입들
type MyBookAddFormRatingRegisterResponseType = RegisterResponse;
type MyBookAddFormRatingRegisterRequestType = Pick<
  useMyBookAddFormHistoryRegisterRequestType,
  'users_books_id'
> & {
  rating: number;
  status: '읽기전' | '다읽음' | '읽는중';
};

// useMyBookAddFormHistoryRegister와 관련된 타입들
type MyBookAddFormHistoryRegisterResponseType = RegisterResponse;
type MyBookAddFormHistoryRegisterRequestType = {
  status: '다읽음' | '읽는중' | '읽기시작함';
  date: Date;
  users_books_id: number;
  page?: number | undefined;
};

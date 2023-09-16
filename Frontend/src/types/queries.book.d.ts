// useBookSearchInfinityQuery의 타입들
type BookSearchInfinityQueryResponseType = {
  meta: {
    is_end: boolean;
    total_count: number;
    pageable_count: number;
  };
  documents: BookSearchInfinityQueryResponseItemType[];
};

type BookSearchInfinityQueryResponseItemType = {
  title: string;
  contents: string;
  authors: string[];
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  translators: string[];
  url: string;
};

// useReadBookMutation의 타입들
type ReadBookMutationResponseType = MutationResponse;
type ReadBookMutationRequestType = BookRegisterType & {
  startDate: Date;
  endDate: Date;
};

// useReadingBookMutation의 타입들

type ReadingBookMutationResponseType = MutationResponse;
type ReadingBookMutationRequestType = BookRegisterType & {
  startDate: Date;
};

// useReadToBookMutation의 타입들

type useReadToBookMutationResponseType = MutationResponse;
type useReadToBookMutationRequestType = BookRegister;

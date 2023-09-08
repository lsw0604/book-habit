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

type ReadBookMutationResponseType = {
  message: string;
  status: StatusType;
};

type ReadBookNutationRequestType = BookRegisterType & {
  rating: number;
  startDate: Date;
  endDate: Date;
};

// useReadingBookMutation의 타입들

type ReadingBookMutationResponseType = {
  message: string;
  status: StatusType;
};

type ReadingBookMutationRequestType = BookRegisterType & {
  page: number;
  startDate: Date;
};

// useReadToBookMutation의 타입들

type useReadToBookMutationResponseType = {
  message: string;
  status: StatusType;
};

type useReadToBookMutationRequestType = BookRegister & {
  rating: number;
};

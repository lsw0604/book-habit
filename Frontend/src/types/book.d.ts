type ResponseBookType = {
  nextPage?: number;
  books: BooksType[];
};

type BooksType = {
  title: string;
  ranking: number;
  author: string;
  image: string;
  isbn: string;
  company: string;
  price: number;
};

type KakaoSearchResponseType = {
  meta: {
    is_end: boolean;
    total_count: number;
    pageable_count: number;
  };
  documents: KakaoSearchResponseDocumentType[];
};

/**
 * * title : [String][도서제목]
 * * contents : [String][도서소개]
 * * url : [String][도서상세url]
 * *
 */

type KakaoSearchResponseDocumentType = {
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

type BookRegisterType = {
  author: string;
  company: string;
  image: string;
  isbn: string;
  title: string;
  status: ModalType;
  price: number;
};

type ReadingBookRegisterType = BookRegisterType & {
  page: number;
  startDate: Date;
};

type ReadBookRegisterType = BookRegisterType & {
  rating: number;
  startDate: Date;
  endDate: Date;
};

type ReadToBookRegisterType = BookRegisterType & {
  rating: number;
};

type BookRegisterResponseType = {
  message: string;
  status: 'success' | 'error';
};

type MyBookResponseType = {
  nextPage?: number;
  books: MyBookType[];
};

type MyBookInfoResponse = {
  books: MyBookInfoResponseType[];
};

type MyBookInfoResponseType = {
  status: BookStateType;
  start_date: string | null;
  end_date: string | null;
  rating: number | null;
  page: number | null;
  created_at: string;
  updated_at: string | null;
};

type MyBookType = Pick<BooksType, 'books_id' | 'isbn' | 'image' | 'title'> & {
  id: number;
  status: BookStateType;
  start_date: Date | null;
  end_date: Date | null;
  rating: number | null;
  page: number | null;
  created_at: Date;
};

type BookStateType = '읽고싶음' | '다읽음' | '읽는중' | '';
type SelectorBookType = '읽고싶음' | '다읽음' | '읽는중' | '전체보기';

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

type BookRegisterType = {
  authors: string;
  publisher: string;
  image: string;
  isbn: string;
  title: string;
  status: ModalType;
  price: number;
  contents: string;
  url: string;
};

type MyBookHistoryRegisterType = {
  status: '읽기시작함' | '읽는중' | '다읽음';
  date: Date;
  users_books_id: number;
  page?: number;
};

type MyBookRatingRegisterType = Omit<
  MyBookHistoryRegisterType,
  'page' | 'date'
> & {
  rating: number;
};

type MyBookInfoAddReadType = {
  users_books_id: number;
  status: BookStateType;
  startDate: Date;
  endDate: Date;
  rating: number;
};

type MyBookInfoAddReadingType = {
  status: BookStateType;
  startDate: Date;
  page: number;
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
  status: StatusType;
};

type MyBookHistoryResponseType = {
  status: '다읽음' | '읽기시작함' | '읽고싶음' | '읽는중';
  date: string;
  page?: number;
  created_at: string;
  updated_at?: string;
};

type MyBookResponseType = {
  nextPage?: number;
  books: MyBookType[];
};

type MyBookInfoResponse = {
  books: MyBookInfoResponseType[];
};

type MyBookType = Pick<BooksType, 'isbn' | 'image' | 'title'> & {
  id: number;
  status: BookStateType;
  created_at: string;
};

type BookStateType = '읽고싶음' | '다읽음' | '읽는중' | '';
type SelectorBookType = '읽고싶음' | '다읽음' | '읽는중' | '전체보기';

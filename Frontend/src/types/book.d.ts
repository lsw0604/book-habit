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

type ReadingBookRegisterType = BookRegisterType & {
  startDate: Date;
};

type ReadBookRegisterType = BookRegisterType & {
  startDate: Date;
  endDate: Date;
};

type ReadToBookRegisterType = BookRegisterType;

type BookRegisterResponseType = {
  message: string;
  status: StatusType;
};

type BookStateType = '읽고싶음' | '다읽음' | '읽는중' | '';
type SelectorBookType = '읽고싶음' | '다읽음' | '읽는중' | '전체보기';

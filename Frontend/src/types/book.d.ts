type BookRegisterType = {
  authors: string;
  publisher: string;
  thumbnail?: string;
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

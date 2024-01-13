type BookRegisterType = {
  authors: string;
  publisher: string;
  thumbnail?: string;
  isbn: string;
  title: string;
  price: number;
  contents: string;
  url: string;
  status: string;
};

type BookRegisterResponseType = {
  message: string;
  status: StatusType;
};

type BookStateType = '읽고싶음' | '다읽음' | '읽는중' | '';
type SelectorBookType = '읽고싶음' | '다읽음' | '읽는중' | '전체보기';

type ModalAtomType = {
  isOpen: boolean;
  title: string;
  isbn: string;
  price: number;
  company: string;
  author: string[];
  image: string;
};

type ReadBookAtomType = {
  startDate: Date | null;
  endDate: Date | null;
  rating: number;
};

type ReadingBookAtomType = Omit<ReadBookAtomType, 'endDate' | 'rating'> & {
  page: number | '';
};

type ModalType = '다읽음' | '읽고싶음' | '읽는중' | '';

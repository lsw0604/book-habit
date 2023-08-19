import { atom } from 'recoil';

const BOOK_ATOM_KEY = 'BOOK_ATOM_KEY';

type BookAtomType = {
  title: string;
  author: string;
  company: string;
  published_date: string;
  image: string;
  rank: number;
};

export const bookAtom = atom<BookAtomType[]>({
  key: BOOK_ATOM_KEY,
  default: [],
});

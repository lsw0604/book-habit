import { atom } from 'recoil';
import { v1 } from 'uuid';

const BOOK_ATOM_KEY = `BOOK_ATOM_KEY/${v1()}`;

export const bookAtom = atom<BookAtomType>({
  key: BOOK_ATOM_KEY,
  default: {
    image: '',
    isbn: '',
    price: 0,
    publisher: '',
    authors: [],
    contents: '',
    url: '',
    title: '',
  },
});

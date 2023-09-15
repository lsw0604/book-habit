import { atom } from 'recoil';
import { v1 } from 'uuid';

const SEARCH_BOOK_ATOM_KEY = `SEARCH_BOOK_ATOM_KEY/${v1()}`;

export const searchBookAtom = atom<SearchBookAtomType>({
  key: SEARCH_BOOK_ATOM_KEY,
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

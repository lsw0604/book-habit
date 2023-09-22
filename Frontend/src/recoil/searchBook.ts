import { atom } from 'recoil';
import { v4 } from 'uuid';

const SEARCH_BOOK_ATOM_KEY = `SEARCH_BOOK_ATOM_KEY/${v4()}`;

export const searchBookAtom = atom<SearchBookAtomType>({
  key: SEARCH_BOOK_ATOM_KEY,
  default: {
    thumbnail: '',
    status: '',
    isbn: '',
    price: 0,
    publisher: '',
    authors: [],
    contents: '',
    url: '',
    title: '',
  },
});

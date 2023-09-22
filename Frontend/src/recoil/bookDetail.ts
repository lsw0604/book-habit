import { atom } from 'recoil';
import { v4 } from 'uuid';

const BOOK_DETAIL_ATOM_KEY = `BOOK_DETAIL_ATOM_KEY_${v4()}`;

export const bookDetailAtom = atom({
  key: BOOK_DETAIL_ATOM_KEY,
  default: {},
});

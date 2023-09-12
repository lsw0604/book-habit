import { atom } from 'recoil';
import { v1 } from 'uuid';

const BOOK_DETAIL_ATOM_KEY = `BOOK_DETAIL_ATOM_KEY_${v1()}`;

export const bookDetailAtom = atom({
  key: BOOK_DETAIL_ATOM_KEY,
  default: {},
});

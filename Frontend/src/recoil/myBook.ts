import { atom } from 'recoil';
import { v1 } from 'uuid';

const MY_BOOK_ATOM_KEY = `MY_BOOK_ATOM_KEY/${v1()}`;

export const myBookAtom = atom<MyBookAtomType>({
  key: MY_BOOK_ATOM_KEY,
  default: {
    isExist: false,
  },
});

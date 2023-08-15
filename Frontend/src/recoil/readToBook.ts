import { atom } from 'recoil';
import { v1 } from 'uuid';

const READ_TO_BOOK_ATOM_KEY = `READ_TO_BOOK_ATOM_KEY/${v1()}`;

export const readToBookAtom = atom<ReadToBookAtomType>({
  key: READ_TO_BOOK_ATOM_KEY,
  default: {
    rating: 0,
    useValidate: false,
  },
});

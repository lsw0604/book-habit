import { atom } from 'recoil';
import { v4 } from 'uuid';

const MY_BOOK_ATOM_KEY = `ADD_FORM_ATOM_KEY/${v4()}`;

export const myBookAtom = atom<MyBookAtomType>({
  key: MY_BOOK_ATOM_KEY,
  default: {
    date: null,
    status: '',
    useValidation: false,
    rating: 0,
    comment: '',
    comment_isOpen: false,
  },
});

import { atom } from 'recoil';
import { v1 } from 'uuid';

const ADD_FORM_ATOM_KEY = `ADD_FORM_ATOM_KEY/${v1()}`;

export const addFormAtom = atom({
  key: ADD_FORM_ATOM_KEY,
  default: {
    date: Date,
    page: 0,
  },
});

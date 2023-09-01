import { atom } from 'recoil';
import { v1 } from 'uuid';

const BOTTOM_SHEET_ATOM_KEY = `BOTTOM_SHEET_ATOM_KEY/${v1()}`;

export const bottomSheetAtom = atom<BottomSheetAtomType>({
  key: BOTTOM_SHEET_ATOM_KEY,
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

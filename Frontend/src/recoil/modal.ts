import { atom } from 'recoil';

const MODAL_ATOM_KEY = 'MODAL_ATOM_KEY';

export const modalAtom = atom<ModalAtomType>({
  key: MODAL_ATOM_KEY,
  default: {
    isOpen: false,
    title: '',
    isbn: '',
    author: [],
    company: '',
    image: '',
    price: 0,
  },
});

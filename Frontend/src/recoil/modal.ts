import { atom } from 'recoil';

const MODAL_ATOM_KEY = 'MODAL_ATOM_KEY';

export const modalAtom = atom<ModalType>({
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

const READ_BOOK_MODAL_ATOM_KEY = 'READ_BOOK_MODAL_ATOM_KEY';

export const readBookModalAtom = atom({
  key: READ_BOOK_MODAL_ATOM_KEY,
  default: {
    startDate: null,
    endDate: null,
    rating: 0,
    title: '',
    isbn: '',
    author: '',
    price: 0,
  },
});

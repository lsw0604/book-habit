import { DefaultValue, atom, selector } from 'recoil';

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
const READ_BOOK_START_DATE_SELECTOR_KEY = 'READ_BOOK_START_DATE_SELECTOR_KEY';
const READ_BOOK_END_DATE_SELECTOR_KEY = 'READ_BOOK_END_DATE_SELECTOR_KEY';
const READ_BOOK_RATING_SELECTOR_KEY = 'READ_BOOK_RATING_SELECTOR_KEY';

type ReadBookAtomType = {
  startDate: Date | null | DefaultValue;
  endDate: Date | null | DefaultValue;
  rating: number | DefaultValue;
};

export const readBookStateAtom = atom<ReadBookAtomType>({
  key: READ_BOOK_MODAL_ATOM_KEY,
  default: {
    startDate: null,
    endDate: null,
    rating: 0,
  },
});

export const readBookStartDateSelector = selector({
  key: READ_BOOK_START_DATE_SELECTOR_KEY,
  get: ({ get }) => {
    const readBookState = get(readBookStateAtom);
    return readBookState.startDate as Date | null;
  },
  set: ({ set, get }, startDate) => {
    const readBookState = get(readBookStateAtom);
    set(readBookStateAtom, { ...readBookState, startDate });
  },
});

export const readBookEndDateSelector = selector({
  key: READ_BOOK_END_DATE_SELECTOR_KEY,
  get: ({ get }) => {
    const readBookState = get(readBookStateAtom);
    return readBookState.endDate as Date | null;
  },
  set: ({ set, get }, endDate) => {
    const readBookState = get(readBookStateAtom);
    set(readBookStateAtom, { ...readBookState, endDate });
  },
});

export const readBookRatingSelector = selector({
  key: READ_BOOK_RATING_SELECTOR_KEY,
  get: ({ get }) => {
    const readBookState = get(readBookStateAtom);
    return readBookState.rating as number;
  },
  set: ({ set, get }, rating) => {
    const readBookState = get(readBookStateAtom);
    set(readBookStateAtom, { ...readBookState, rating });
  },
});

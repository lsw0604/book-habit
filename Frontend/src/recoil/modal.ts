import { atom, selector } from 'recoil';

const MODAL_ATOM_KEY = 'MODAL_ATOM_KEY';
const READING_BOOK_ATOM_KEY = 'READING_BOOK_ATOM_KEY';

/**
 * * 책의 상태(BOTTOM_MODAL_SHEET)의 ATOM
 */

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

/**
 * * 읽는중인 책(READING_BOOK)의 ATOM
 */
export const readingBookAtom = atom<ReadingBookAtomType>({
  key: READING_BOOK_ATOM_KEY,
  default: {
    startDate: null,
    page: 0,
  },
});

export const readingBookPageSelector = selector({
  key: 'READING_BOOK_PAGE_SELECTOR',
  get: ({ get }) => {
    const readingBookState = get(readingBookAtom);
    return `${readingBookState.page} 쪽까지 읽었어요.`;
  },
});

import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { differenceInDays } from 'date-fns';
import addHours from 'date-fns/addHours';

const BOOK_REGISTER_MODAL_ATOM_KEY = `BOOK_REGISTER_MODAL_ATOM_KEY/${v1()}`;

const BOOK_READ_SELECTOR_KEY = `BOOK_READ_SELECTOR_KEY/${v1()}`;
const BOOK_READING_SELECTOR_KEY = `BOOK_READING_SELECTOR_KEY/${v1()}`;

export const bookRegisterModalAtom = atom<BookRegisterModalAtomType>({
  key: BOOK_REGISTER_MODAL_ATOM_KEY,
  default: {
    startDate: null,
    endDate: null,
    useValidate: false,
  },
});

export const bookReadSelector = selector({
  key: BOOK_READ_SELECTOR_KEY,
  get: ({ get }) => {
    const readBookState = get(bookRegisterModalAtom);

    const { startDate, endDate } = readBookState;

    if (!startDate || !endDate) return null;

    const dayDiff = differenceInDays(endDate, startDate);

    const start = addHours(startDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');
    const end = addHours(endDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');

    return `${start[0]}년 ${start[1]}월 ${start[2]}일 부터 ${end[0]}년 ${end[1]}월 ${end[2]}일 까지 ${dayDiff} 일 동안 읽으셨습니다.`;
  },
});

export const bookReadingSelector = selector({
  key: BOOK_READING_SELECTOR_KEY,
  get: ({ get }) => {
    const readingBookState = get(bookRegisterModalAtom);

    const { startDate } = readingBookState;

    if (!startDate) return null;

    const dayDiff = differenceInDays(new Date(), startDate);

    const start = addHours(startDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');

    return `${start[0]}년 ${start[1]}월 ${start[2]}일 부터 읽기 시작해서 오늘까지 ${dayDiff}일 동안 읽고 있는 중이에요.`;
  },
});

import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import addHours from 'date-fns/addHours';
import { differenceInDays } from 'date-fns';

const READING_BOOK_ATOM_KEY = `READING_BOOK_ATOM_KEY/${v1()}`;
const READING_BOOK_SELECTOR_KEY = `READING_BOOK_SELECTOR/${v1()}`;

export const readingBookAtom = atom<ReadingBookAtomType>({
  key: READING_BOOK_ATOM_KEY,
  default: {
    startDate: null,
    page: 0,
  },
});

export const readingBookSelector = selector({
  key: READING_BOOK_SELECTOR_KEY,
  get: ({ get }) => {
    const readingBookState = get(readingBookAtom);

    const { startDate, page } = readingBookState;

    if (!startDate) return null;
    if (!page) return null;

    const dayDiff = differenceInDays(new Date(), startDate);

    const start = addHours(startDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');

    return [
      `${start[0]}년 ${start[1]}월 ${start[2]}일 부터 읽기 시작해서`,
      `${dayDiff} 일 동안 ${page} 쪽 읽고 있는 중이에요.`,
    ];
  },
});

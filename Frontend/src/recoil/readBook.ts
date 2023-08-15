import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { differenceInDays } from 'date-fns';
import addHours from 'date-fns/addHours';
import { ratingList } from 'lib/staticData';

const READ_BOOK_ATOM_KEY = `READ_BOOK_ATOM_KEY/${v1()}`;
const READ_BOOK_SELECTOR_KEY = `READ_BOOK_SELECTOR_KEY/${v1()}`;

export const readBookAtom = atom<ReadBookAtomType>({
  key: READ_BOOK_ATOM_KEY,
  default: {
    startDate: null,
    endDate: null,
    rating: 0,
  },
});

export const readBookSelector = selector({
  key: READ_BOOK_SELECTOR_KEY,
  get: ({ get }) => {
    const readBookState = get(readBookAtom);

    const { startDate, endDate, rating } = readBookState;

    if (!startDate || !endDate) {
      return null;
    }

    if (!rating) {
      return null;
    }

    const dayDiff = differenceInDays(endDate, startDate);

    const start = addHours(startDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');
    const end = addHours(endDate as Date, 9)
      .toISOString()
      .split('T')[0]
      .split('-');

    const result = [
      `${start[0]}년 ${start[1]}월 ${start[2]}일 부터 ${end[0]}년 ${end[1]}월 ${end[2]}일 까지`,
      `${dayDiff} 일 동안 읽으셨습니다.`,
      `다른 분들에게는 ${ratingList[rating]}`,
    ];

    return result;
  },
});

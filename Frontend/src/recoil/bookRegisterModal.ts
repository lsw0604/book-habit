import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import dayjs from 'dayjs';

dayjs.locale('ko');

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

    const dayDiff = dayjs(endDate)
      .add(9, 'hour')
      .diff(dayjs(startDate).add(9, 'hour'), 'day');

    const start = dayjs(startDate).add(9, 'hour').format('YYYY년 MM월 DD일');
    const end = dayjs(endDate).add(9, 'hour').format('YYYY년 MM월 DD일');

    return `${start} 부터 ${end} 까지 ${dayDiff} 일 동안 읽었습니다.`;
  },
});

export const bookReadingSelector = selector({
  key: BOOK_READING_SELECTOR_KEY,
  get: ({ get }) => {
    const readingBookState = get(bookRegisterModalAtom);

    const { startDate } = readingBookState;

    if (!startDate) return null;

    const dayDiff = dayjs().diff(dayjs(startDate), 'day');

    const start = dayjs(startDate).add(9, 'hour').format('YYYY년 MM월 DD일');

    return `${start} 부터 읽기 시작해서 오늘까지 ${dayDiff}일 동안 읽고 있는 중이에요.`;
  },
});

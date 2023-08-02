import { atom, selector } from 'recoil';

const BOOK_ATOM_KEY = 'BOOK_ATOM_KEY';
const BOOK_SELECTOR_KEY = 'BOOK_SELECTOR_KEY';

type BookAtomType = {
  title: string;
  author: string;
  company: string;
  published_date: string;
  image: string;
  rank: number;
};

export const bookAtom = atom<BookAtomType[]>({
  key: BOOK_ATOM_KEY,
  default: [],
});

export const BooKSelector = selector({
  key: BOOK_SELECTOR_KEY,
  get: ({ get }) => {
    const initialBooKProps = get(bookAtom);
    console.log(BOOK_SELECTOR_KEY, initialBooKProps);
    return initialBooKProps;
  },
});

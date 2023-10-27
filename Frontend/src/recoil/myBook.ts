import { atom, selector } from 'recoil';
import { v4 } from 'uuid';

const MY_BOOK_ATOM_KEY = `ADD_FORM_ATOM_KEY/${v4()}`;
const MY_BOOK_COMMENT_SELECTOR_KEY = `COMMENT_SELECTOR_KEY/${v4()}`;
const MY_BOOK_COMMENT_ID_SELECTOR_KEY = `COMMENT_ID_SELECTOR_KEY/${v4()}`;
const MY_BOOK_RATING_SELECTOR_KEY = `RATING_ELECTOR_KEY/${v4()}`;
const MY_BOOK_STATUS_SELECTOR_KEY = `STATUS_SELECTOR_KEY/${v4()}`;
const MY_BOOK_IS_OPEN_SELECTOR_KEY = `IS_OPEN_SELECTOR_KEY/${v4()}`;

export const myBookAtom = atom<MyBookAtomType>({
  key: MY_BOOK_ATOM_KEY,
  default: {
    date: null,
    status: '',
    useValidation: false,
    rating: 0,
    comment: '',
    comment_isOpen: false,
  },
});

export const myBookCommentSelector = selector({
  key: MY_BOOK_COMMENT_SELECTOR_KEY,
  get: ({ get }) => {
    const myBookState = get(myBookAtom);
    return myBookState.comment;
  },
});

export const myBookCommentIdSelector = selector({
  key: MY_BOOK_COMMENT_ID_SELECTOR_KEY,
  get: ({ get }) => {
    const myBookState = get(myBookAtom);
    return myBookState.comment_id;
  },
});

export const myBookStatusSelector = selector({
  key: MY_BOOK_STATUS_SELECTOR_KEY,
  get: ({ get }) => {
    const myBookState = get(myBookAtom);
    return myBookState.status;
  },
});

export const myBookRatingSelector = selector({
  key: MY_BOOK_RATING_SELECTOR_KEY,
  get: ({ get }) => {
    const myBookState = get(myBookAtom);
    return myBookState.rating;
  },
});

export const myBookIsOpenSelector = selector({
  key: MY_BOOK_IS_OPEN_SELECTOR_KEY,
  get: ({ get }) => {
    const myBookState = get(myBookAtom);
    return myBookState.comment_isOpen;
  },
});

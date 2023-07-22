import { atom, selector } from 'recoil';

const TOAST_ATOM_KEY = 'TOAST_ATOM_KEY';
const TOAST_SELECTOR_KEY = 'TOAST_SELECTOR_KEY';

type IToastAtomType = {
  id: number;
  status: 'success' | 'failure' | 'info' | 'error';
  message: string;
};

export const toastAtom = atom<IToastAtomType[]>({
  key: TOAST_ATOM_KEY,
  default: [],
});

export const toastSelector = selector({
  key: TOAST_SELECTOR_KEY,
  get: ({ get }) => {
    const initialToastProps = get(toastAtom);
    return initialToastProps;
  },
});

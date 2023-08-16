import { atom } from 'recoil';

const TOAST_ATOM_KEY = 'TOAST_ATOM_KEY';

export const toastAtom = atom<ToastType[]>({
  key: TOAST_ATOM_KEY,
  default: [],
});

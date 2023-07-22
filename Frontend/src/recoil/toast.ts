import { atom } from 'recoil';

const TOAST_ATOM_KEY = 'toast_atom_key';

type IToastAtomType = {
  id: string;
  status: 'success' | 'failure' | 'info' | 'error';
  message: string;
};

export const toastAtom = atom<IToastAtomType[]>({
  key: TOAST_ATOM_KEY,
  default: [],
});

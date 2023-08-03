import { atom } from 'recoil';

const MODAL_ATOM_KEY = 'MODAL_ATOM_KEY';

export const modalAtom = atom<ModalType>({
  key: MODAL_ATOM_KEY,
  default: {
    isOpen: false,
    title: '',
    isbn: '',
  },
});

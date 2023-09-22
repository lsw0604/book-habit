import { atom } from 'recoil';
import { v4 } from 'uuid';

const MODAL_ATOM_KEY = `MODAL_ATOM_KEY/${v4()}`;

export const modalAtom = atom<ModalAtomType>({
  key: MODAL_ATOM_KEY,
  default: {
    isOpen: false,
    type: undefined,
  },
});

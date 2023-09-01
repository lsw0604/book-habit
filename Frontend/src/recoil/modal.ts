import { atom } from 'recoil';
import { v1 } from 'uuid';

const MODAL_ATOM_KEY = `MODAL_ATOM_KEY/${v1()}`;

export const modalAtom = atom<ModalAtomType>({
  key: MODAL_ATOM_KEY,
  default: {
    isOpen: false,
  },
});

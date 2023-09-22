import { atom } from 'recoil';
import { v4 } from 'uuid';

const USER_ATOM_KEY = `USER_ATOM_KEY/${v4()}`;

export const userAtom = atom<UserAtomType>({
  key: USER_ATOM_KEY,
  default: {
    id: 0,
    email: '',
    name: '',
    isLogged: false,
    age: 0,
    gender: '',
    provider: '',
    profile: '',
  },
});

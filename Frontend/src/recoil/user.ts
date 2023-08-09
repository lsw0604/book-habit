import { atom } from 'recoil';
import { v1 } from 'uuid';

const USER_ATOM_KEY = `USER_ATOM_KEY/${v1()}`;

type IUserAtomType = {
  id: number;
  email: string;
  name: string;
  isLogged: boolean;
  age: number;
  gender: 'male' | 'female' | '';
  provider: 'local' | 'kakao' | '';
};

export const userAtom = atom<IUserAtomType>({
  key: USER_ATOM_KEY,
  default: {
    id: 0,
    email: '',
    name: '',
    isLogged: false,
    age: 0,
    gender: '',
    provider: '',
  },
});

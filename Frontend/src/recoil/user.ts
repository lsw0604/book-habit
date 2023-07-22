import { atom, selector } from 'recoil';

const USER_ATOM_KEY = 'USER_ATOM_KEY';
const USER_SELECTOR_KEY = 'USER_SELECTOR_KEY';

type IUserAtomType = {
  id: number;
  email: string;
  name: string;
};

export const userAtom = atom<IUserAtomType>({
  key: USER_ATOM_KEY,
  default: {
    id: 0,
    email: '',
    name: '',
  },
});

export const userSelector = selector({
  key: USER_SELECTOR_KEY,
  get: ({ get }) => {
    const initialUserProps = get(userAtom);
    return initialUserProps;
  },
});

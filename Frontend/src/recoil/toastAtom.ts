import { atom } from 'recoil';

type toastStateType = {
  id: string;
  status: 'success' | 'failure' | 'info' | 'error';
  message: string;
};

export const toastState = atom<toastStateType[]>({
  key: 'toast',
  default: [],
});

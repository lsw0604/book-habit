import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useEffect } from 'react';
import { toastAtom } from 'recoil/toast';
import { v1 } from 'uuid';

export default function useToastHook() {
  const toastState = useRecoilValue(toastAtom);

  const addToast = useRecoilCallback<
    [
      { message: string; status: 'error' | 'info' | 'success' | 'warning' | '' }
    ],
    void
  >(
    ({ set }) =>
      ({ message, status }) => {
        const newToast = { id: v1(), status, message };
        set(toastAtom, (prev) => [newToast, ...prev]);
      },
    []
  );

  const deleteToast = useRecoilCallback(
    ({ set }) =>
      ({ id }) => {
        set(toastAtom, (prev) => prev.filter((toast) => toast.id !== id));
      },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastState.length > 0) {
        deleteToast({ id: toastState[0].id });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [toastState, deleteToast]);

  return { addToast, deleteToast, toastState };
}

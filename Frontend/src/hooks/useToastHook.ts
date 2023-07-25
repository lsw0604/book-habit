import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useEffect } from 'react';
import { toastAtom } from 'recoil/toast';

export default function useToastHook() {
  const toastState = useRecoilValue(toastAtom);

  const addToast = useRecoilCallback(
    ({ set }) =>
      ({ message, status }) => {
        const newToast = { id: Date.now(), status, message };
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (toastState.length > 0) {
  //       deleteToast({ id: toastState[0].id });
  //     }
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [toastState, deleteToast]);

  return { addToast, deleteToast, toastState };
}

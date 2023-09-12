import { useRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';

export default function useModalHook() {
  const [modalState, setModalState] = useRecoilState(modalAtom);

  const onChangeModalStateIsOpen = (isOpen: boolean) => {
    setModalState((prev: ModalAtomType) => ({
      ...prev,
      isOpen,
    }));
  };

  const onChangeModalStateType = (
    type?: 'search' | 'isLogin' | 'modify' | 'myBook'
  ) => {
    setModalState((prev: ModalAtomType) => ({
      ...prev,
      type,
    }));
  };

  const modalStateIsOpen = modalState.isOpen;
  const modalStateType = modalState.type;

  return {
    onChangeModalStateIsOpen,
    onChangeModalStateType,
    setModalState,
    modalStateIsOpen,
    modalStateType,
    modalState,
  };
}

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  bookRegisterModalAtom,
  bookReadSelector,
  bookReadingSelector,
} from 'recoil/bookRegisterModal';

export default function useBookRegisterModalHook() {
  const [bookRegisterModalState, setBookRegisterModalState] = useRecoilState(
    bookRegisterModalAtom
  );
  const readStatus = useRecoilValue(bookReadSelector);
  const readingStatus = useRecoilValue(bookReadingSelector);

  const onChangeBookRegisterModalStartDate = (startDate: Date | null) => {
    if (startDate) {
      setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
        ...prev,
        startDate,
      }));
    } else {
      setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
        ...prev,
        startDate: null,
      }));
    }
  };

  const onChangeBookRegisterModalEndDate = (endDate: Date | null) => {
    if (endDate) {
      setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
        ...prev,
        endDate,
      }));
    } else {
      setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
        ...prev,
        endDate: null,
      }));
    }
  };

  const onChangeBookRegisterModalUseValidation = (useValidate: boolean) => {
    setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
      ...prev,
      useValidate,
    }));
  };

  const bookRegisterModalStartDate = bookRegisterModalState.startDate;
  const bookRegisterModalEndDate = bookRegisterModalState.endDate;
  const bookRegisterModalUseValidation = bookRegisterModalState.useValidate;

  const bookRegisterModalReadValidation =
    bookRegisterModalStartDate !== null && bookRegisterModalEndDate !== null;

  const bookRegisterModalReadingValidation =
    bookRegisterModalStartDate !== null;

  return {
    onChangeBookRegisterModalStartDate,
    onChangeBookRegisterModalEndDate,
    onChangeBookRegisterModalUseValidation,
    setBookRegisterModalState,
    bookRegisterModalStartDate,
    bookRegisterModalEndDate,
    bookRegisterModalUseValidation,
    bookRegisterModalReadValidation,
    bookRegisterModalReadingValidation,
    bookRegisterModalState,
    readStatus,
    readingStatus,
  };
}

import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, ChangeEvent } from 'react';
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

  const onChangeBookRegisterModalPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
        ...prev,
        page: event.target.value !== '' ? parseInt(event.target.value) : '',
      }));
    },
    []
  );

  const onChangeBookRegisterModalRating = (rating: number) => {
    setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
      ...prev,
      rating,
    }));
  };

  const onChangeBookRegisterModalUseValidation = (useValidate: boolean) => {
    setBookRegisterModalState((prev: BookRegisterModalAtomType) => ({
      ...prev,
      useValidate,
    }));
  };

  const bookRegisterModalStartDate = bookRegisterModalState.startDate;
  const bookRegisterModalEndDate = bookRegisterModalState.endDate;
  const bookRegisterModalPage = bookRegisterModalState.page;
  const bookRegisterModalRating = bookRegisterModalState.rating;
  const bookRegisterModalUseValidation = bookRegisterModalState.useValidate;

  const bookRegisterModalReadValidation =
    bookRegisterModalStartDate !== null &&
    bookRegisterModalEndDate !== null &&
    bookRegisterModalRating &&
    bookRegisterModalRating > 0;

  const bookRegisterModalReadingValidation =
    bookRegisterModalStartDate !== null &&
    bookRegisterModalPage &&
    bookRegisterModalPage > 0;

  const bookRegisterModalReadToValidation =
    bookRegisterModalRating && bookRegisterModalRating > 0;

  return {
    onChangeBookRegisterModalStartDate,
    onChangeBookRegisterModalEndDate,
    onChangeBookRegisterModalPage,
    onChangeBookRegisterModalRating,
    onChangeBookRegisterModalUseValidation,
    setBookRegisterModalState,
    bookRegisterModalStartDate,
    bookRegisterModalEndDate,
    bookRegisterModalPage,
    bookRegisterModalRating,
    bookRegisterModalUseValidation,
    bookRegisterModalReadValidation,
    bookRegisterModalReadingValidation,
    bookRegisterModalReadToValidation,
    bookRegisterModalState,
    readStatus,
    readingStatus,
  };
}

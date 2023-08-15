import { useRecoilState, useRecoilValue } from 'recoil';
import { readBookAtom, readBookSelector } from 'recoil/readBook';

export default function useReadModalHook() {
  const [readBookState, setReadBookState] = useRecoilState(readBookAtom);
  const readBookStatus = useRecoilValue(readBookSelector);

  const onChangeReadBookUseValidation = (useValidate: boolean) => {
    setReadBookState((prev: ReadBookAtomType) => ({ ...prev, useValidate }));
  };

  const onChangeReadBookStartDate = (startDate: Date | null) => {
    if (startDate) {
      setReadBookState((prev: ReadBookAtomType) => ({
        ...prev,
        startDate,
      }));
    } else {
      setReadBookState((prev: ReadBookAtomType) => ({
        ...prev,
        startDate: null,
      }));
    }
  };

  const onChangeReadBookEndDate = (endDate: Date | null) => {
    if (endDate) {
      setReadBookState((prev: ReadBookAtomType) => ({ ...prev, endDate }));
    } else {
      setReadBookState((prev: ReadBookAtomType) => ({
        ...prev,
        endDate: null,
      }));
    }
  };

  const onChangeReadBookRating = (rating: number) => {
    setReadBookState((prev: ReadBookAtomType) => ({ ...prev, rating }));
  };

  const readBookStartDate = readBookState.startDate;
  const readBookEndDate = readBookState.endDate;
  const readBookRating = readBookState.rating;
  const readBookUseValidation = readBookState.useValidate;
  const readBookFormValidate =
    readBookState.endDate !== null &&
    readBookState.startDate !== null &&
    readBookState.rating !== 0;

  return {
    readBookState,
    readBookStartDate,
    readBookEndDate,
    readBookRating,
    readBookStatus,
    readBookUseValidation,
    readBookFormValidate,
    setReadBookState,
    onChangeReadBookEndDate,
    onChangeReadBookStartDate,
    onChangeReadBookRating,
    onChangeReadBookUseValidation,
  };
}

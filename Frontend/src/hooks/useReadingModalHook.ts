import { ChangeEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { readingBookAtom, readingBookSelector } from 'recoil/readingBook';

export default function useReadingModalHook() {
  const [readingBookState, setReadingBookState] =
    useRecoilState(readingBookAtom);
  const readingBookStatus = useRecoilValue(readingBookSelector);

  const onChangeReadingBookUseValidation = (useValidate: boolean) => {
    setReadingBookState((prev: ReadingBookAtomType) => ({
      ...prev,
      useValidate,
    }));
  };

  const onChangeReadingBookStartDate = (startDate: Date | null) => {
    setReadingBookState((prev: ReadingBookAtomType) => ({
      ...prev,
      startDate,
    }));
  };

  const onChangeReadingBookPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setReadingBookState((prev: ReadingBookAtomType) => ({
        ...prev,
        page: event.target.value !== '' ? parseInt(event.target.value) : '',
      }));
    },
    []
  );

  const readingBookStartDate = readingBookState.startDate;
  const readingBookPage = readingBookState.page;
  const readingBookUseValidation = readingBookState.useValidate;
  const readingBookFormUseValidate =
    readingBookState.page !== 0 && readingBookState.startDate !== null;

  return {
    readingBookState,
    readingBookPage,
    readingBookStartDate,
    readingBookStatus,
    readingBookUseValidation,
    readingBookFormUseValidate,
    setReadingBookState,
    onChangeReadingBookPage,
    onChangeReadingBookStartDate,
    onChangeReadingBookUseValidation,
  };
}

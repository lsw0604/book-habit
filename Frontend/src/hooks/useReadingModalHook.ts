import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { readingBookAtom } from 'recoil/modal';

export default function useReadingModalHook() {
  const [readingBookState, setReadingBookState] =
    useRecoilState(readingBookAtom);

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

  return {
    readingBookState,
    readingBookPage,
    readingBookStartDate,
    setReadingBookState,
    onChangeReadingBookPage,
    onChangeReadingBookStartDate,
  };
}

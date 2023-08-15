import { useRecoilState } from 'recoil';
import { readToBookAtom } from 'recoil/readToBook';

export default function useReadToModalHook() {
  const [readToBookState, setReadToBookState] = useRecoilState(readToBookAtom);

  const onChangeReadToBookRating = (rating: number) => {
    setReadToBookState((prev: ReadToBookAtomType) => ({ ...prev, rating }));
  };

  const onChangeReadToBookUseValidation = (useValidate: boolean) => {
    setReadToBookState((prev: ReadToBookAtomType) => ({
      ...prev,
      useValidate,
    }));
  };

  const readToBookRating = readToBookState.rating;
  const readToBookUseValidation = readToBookState.useValidate;
  const readToBookFormUseValidate = readToBookState.rating !== 0;

  return {
    readToBookState,
    readToBookRating,
    readToBookUseValidation,
    readToBookFormUseValidate,
    setReadToBookState,
    onChangeReadToBookRating,
    onChangeReadToBookUseValidation,
  };
}

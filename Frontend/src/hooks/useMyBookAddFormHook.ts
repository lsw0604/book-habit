import { useRecoilState } from 'recoil';
import { useCallback, ChangeEvent } from 'react';
import { addFormAtom } from 'recoil/addForm';

export default function useMyBookAddFormHook() {
  const [addFormState, setAddFormState] = useRecoilState(addFormAtom);

  const onChangeAddFormDate = (date: Date | null) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      date,
    }));
  };

  const onChangeAddFormStatus = (status: string) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      status,
    }));
  };

  const onChangeAddFormPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddFormState((prev: addFormAtomType) => ({
        ...prev,
        page: event.target.value !== '' ? parseInt(event.target.value) : '',
      }));
    },
    []
  );

  const onChangeAddFormUseValidation = (useValidation: boolean) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      useValidation,
    }));
  };

  const onChangeAddFormRating = (rating: number) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      rating,
    }));
  };

  const onChangeAddFormStateInitial = () => {
    setAddFormState({
      date: null,
      page: '',
      status: '',
      useValidation: false,
      rating: 0,
    });
  };

  const addFormDate = addFormState.date;
  const addFormStatus = addFormState.status;
  const addFormUseValidation = addFormState.useValidation;
  const addFormPage = addFormState.page;
  const addFromRating = addFormState.rating;

  const useMyBookAddFormHistoryValidation =
    addFormDate !== null && addFormStatus !== '';
  const useMyBookAddFromRatingValidation =
    addFormStatus !== '' && addFromRating !== 0;

  return {
    onChangeAddFormDate,
    onChangeAddFormUseValidation,
    onChangeAddFormStatus,
    onChangeAddFormPage,
    setAddFormState,
    onChangeAddFormRating,
    onChangeAddFormStateInitial,
    addFormDate,
    addFormStatus,
    addFormPage,
    addFromRating,
    addFormUseValidation,
    addFormState,
    useMyBookAddFormHistoryValidation,
    useMyBookAddFromRatingValidation,
  };
}

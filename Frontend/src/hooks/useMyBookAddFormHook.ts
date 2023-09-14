import { useRecoilState } from 'recoil';
import { addFormAtom } from 'recoil/addForm';
import { useCallback, ChangeEvent } from 'react';

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

  const onChangeAddFormComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setAddFormState((prev: addFormAtomType) => ({
        ...prev,
        comment: event.target.value,
      }));
    },
    []
  );

  const onChangeAddFormCommentId = (comment_id: number) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      comment_id,
    }));
  };

  const onChangeAddFormUsersBooksId = (users_books_id: number) => {
    setAddFormState((prev: addFormAtomType) => ({
      ...prev,
      users_books_id,
    }));
  };

  const onChangeAddFormStateInitial = () => {
    setAddFormState({
      date: null,
      status: '',
      useValidation: false,
      rating: 0,
      comment: '',
    });
  };

  const addFormDate = addFormState.date;
  const addFormStatus = addFormState.status;
  const addFormUseValidation = addFormState.useValidation;
  const addFormRating = addFormState.rating;
  const addFormComment = addFormState.comment;
  const addFormCommentId = addFormState.comment_id;
  const addFormUsersBooksId = addFormState.users_books_id;

  const useMyBookAddFormHistoryValidation =
    addFormDate !== null && addFormStatus !== '';
  const useMyBookAddFormCommentValidation =
    addFormStatus !== '' && addFormComment !== '' && addFormRating !== 0;

  return {
    onChangeAddFormDate,
    onChangeAddFormUseValidation,
    onChangeAddFormStatus,
    onChangeAddFormComment,
    onChangeAddFormRating,
    onChangeAddFormCommentId,
    onChangeAddFormUsersBooksId,
    onChangeAddFormStateInitial,
    setAddFormState,
    addFormDate,
    addFormStatus,
    addFormRating,
    addFormUseValidation,
    addFormState,
    addFormComment,
    addFormCommentId,
    addFormUsersBooksId,
    useMyBookAddFormHistoryValidation,
    useMyBookAddFormCommentValidation,
  };
}

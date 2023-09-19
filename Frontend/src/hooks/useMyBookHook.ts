import { useRecoilState } from 'recoil';
import { myBookAtom } from 'recoil/myBook';
import { useCallback, ChangeEvent } from 'react';

export default function useMyBookHook() {
  const [myBookState, setMyBookState] = useRecoilState(myBookAtom);

  const onChangeMyBookDate = (date: Date | null) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      date,
    }));
  };

  const onChangeMyBookStatus = (status: string) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      status,
    }));
  };

  const onChangeMyBookUseValidation = (useValidation: boolean) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      useValidation,
    }));
  };

  const onChangeMyBookRating = (rating: number) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      rating,
    }));
  };

  const onChangeMyBookComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMyBookState((prev: MyBookAtomType) => ({
        ...prev,
        comment: event.target.value,
      }));
    },
    []
  );

  const onChangeMyBookCommentId = (comment_id: number) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      comment_id,
    }));
  };

  const onChangeMyBookUsersBooksId = (users_books_id: number) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      users_books_id,
    }));
  };

  const onChangeMyBookHistoryId = (history_id: number) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      history_id,
    }));
  };

  const onChangeMyBookCommentIsOpen = (comment_isOpen: boolean) => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      comment_isOpen,
    }));
  };

  const onChangeMyBookStateInitial = () => {
    setMyBookState({
      date: null,
      status: '',
      useValidation: false,
      rating: 0,
      comment: '',
      comment_id: undefined,
      users_books_id: undefined,
      history_id: undefined,
      comment_isOpen: false,
    });
  };

  const myBookDate = myBookState.date;
  const myBookStatus = myBookState.status;
  const myBookUseValidation = myBookState.useValidation;
  const myBookRating = myBookState.rating;
  const myBookComment = myBookState.comment;
  const myBookCommentId = myBookState.comment_id;
  const myBookUsersBooksId = myBookState.users_books_id;
  const myBookHistoryId = myBookState.history_id;
  const myBookCommentIsOpen = myBookState.comment_isOpen;

  const useMyBookHistoryValidation = myBookDate !== null && myBookStatus !== '';
  const useMyBookCommentValidation =
    myBookStatus !== '' && myBookComment !== '' && myBookRating !== 0;

  return {
    onChangeMyBookDate,
    onChangeMyBookUseValidation,
    onChangeMyBookStatus,
    onChangeMyBookComment,
    onChangeMyBookRating,
    onChangeMyBookCommentId,
    onChangeMyBookUsersBooksId,
    onChangeMyBookHistoryId,
    onChangeMyBookCommentIsOpen,
    onChangeMyBookStateInitial,
    setMyBookState,
    myBookDate,
    myBookStatus,
    myBookRating,
    myBookState,
    myBookUseValidation,
    myBookComment,
    myBookCommentId,
    myBookUsersBooksId,
    myBookHistoryId,
    myBookCommentIsOpen,
    useMyBookHistoryValidation,
    useMyBookCommentValidation,
  };
}

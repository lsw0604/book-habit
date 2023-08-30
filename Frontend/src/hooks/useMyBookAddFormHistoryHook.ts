import { useRecoilState } from 'recoil';
import { useCallback, ChangeEvent } from 'react';
import { addFormAtom } from 'recoil/addForm';

export default function useMyBookAddFormHistoryHook() {
  const [addFormHistoryState, setAddFormHistoryState] =
    useRecoilState(addFormAtom);

  const onChangeAddFormHistoryDate = (date: Date | null) => {
    setAddFormHistoryState((prev: addFormAtomType) => ({
      ...prev,
      date,
    }));
  };

  const onChangeAddFormHistoryStatus = (status: string) => {
    setAddFormHistoryState((prev: addFormAtomType) => ({
      ...prev,
      status,
    }));
  };

  const onChangeAddFormHistoryPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddFormHistoryState((prev: addFormAtomType) => ({
        ...prev,
        page: event.target.value !== '' ? parseInt(event.target.value) : '',
      }));
    },
    []
  );

  const onChangeAddFormHistoryUseValidation = (useValidation: boolean) => {
    setAddFormHistoryState((prev: addFormAtomType) => ({
      ...prev,
      useValidation,
    }));
  };

  const addFormHistoryDate = addFormHistoryState.date;
  const addFormHistoryStatus = addFormHistoryState.status;
  const addFormHistoryUseValidation = addFormHistoryState.useValidation;
  const addFormHistoryPage = addFormHistoryState.page;
  const useMyBookAddFormHistoryValidate =
    addFormHistoryDate !== null && addFormHistoryStatus !== '';

  return {
    onChangeAddFormHistoryDate,
    onChangeAddFormHistoryUseValidation,
    onChangeAddFormHistoryStatus,
    onChangeAddFormHistoryPage,
    setAddFormHistoryState,
    addFormHistoryDate,
    addFormHistoryStatus,
    addFormHistoryPage,
    addFormHistoryUseValidation,
    addFormHistoryState,
    useMyBookAddFormHistoryValidate,
  };
}

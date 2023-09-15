type ModalAtomType = {
  isOpen: boolean;
  type?:
    | 'isLogin'
    | 'search'
    | 'modify'
    | 'myBook'
    | 'modifyComment'
    | 'registerComment'
    | 'deleteComment'
    | 'registerHistory'
    | 'deleteHistory'
    | 'deleteMyBook';
};

type ReadBookAtomType = {
  startDate: Date | null;
  endDate: Date | null;
  rating: number;
  useValidate: boolean;
};

type ReadingBookAtomType = Omit<ReadBookAtomType, 'endDate' | 'rating'> & {
  page: number | '';
};

type ReadToBookAtomType = Omit<ReadBookAtomType, 'endDate' | 'startDate'>;

type ModalType = '다읽음' | '읽고싶음' | '읽는중' | '';

interface IBottomSheetStartDate {
  startDate: Date | null;
  endDate?: Date | null;
  onChange: (date: Date | null) => void;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
}

interface IBottomSheetEndDate
  extends Omit<IBottomSheetStartDate, 'startDate' | 'endDate'> {
  startDate?: Date | null;
  endDate: Date | null;
}

interface IBottomSheet {
  useValidation: boolean;
}

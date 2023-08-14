import { useRecoilState } from 'recoil';
import {
  readBookEndDateSelector,
  readBookStartDateSelector,
  readBookRatingSelector,
  readBookStateAtom,
} from 'recoil/modal';

export default function useReadModalHook() {
  const [startDate, setStartDate] = useRecoilState(readBookStartDateSelector);
  const [endDate, setEndDate] = useRecoilState(readBookEndDateSelector);
  const [rating, setRating] = useRecoilState(readBookRatingSelector);

  const [readBookAtomState, setReadBookAtomState] =
    useRecoilState(readBookStateAtom);

  return {
    startDate,
    endDate,
    rating,
    setEndDate,
    setStartDate,
    setRating,
    readBookAtomState,
    setReadBookAtomState,
  };
}

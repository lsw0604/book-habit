import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarAtom, calendarDetailSelector } from 'recoil/calendar';

export default function useCalendarHook() {
  const [calendarState, setCalendarState] = useRecoilState(calendarAtom);

  const initialDate = useRecoilValue(calendarDetailSelector);

  return {
    calendarState,
    setCalendarState,
    initialDate,
  };
}

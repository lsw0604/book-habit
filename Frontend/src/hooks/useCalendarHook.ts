import { useRecoilState } from 'recoil';
import { calendarAtom } from 'recoil/calendar';

export default function useCalendarHook() {
  const [calendarState, setCalendarState] = useRecoilState(calendarAtom);

  return {
    calendarState,
    setCalendarState,
  };
}

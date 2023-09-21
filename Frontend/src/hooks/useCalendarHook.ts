import dayjs from 'dayjs';
import { ICalendar } from 'recoil/calendar';

export default function useCalendarHook() {
  const getUpdatedCalendar = (
    currentCalendar: ICalendar,
    calendarMonthIncrease: number
  ): dayjs.Dayjs => {
    return currentCalendar.startDate
      .clone()
      .add(calendarMonthIncrease, 'months');
  };

  return {};
}

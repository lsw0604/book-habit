import { atom } from 'recoil';
import { v1 } from 'uuid';
import dayjs from 'dayjs';
import { ICalendar, getCalendarDetail } from 'lib/utils/calendar';

const CALENDAR_ATOM_KEY = `CALENDAR_ATOM_KEY/${v1()}`;

export const calendarAtom = atom<ICalendar>({
  key: CALENDAR_ATOM_KEY,
  default: getCalendarDetail(dayjs()),
});

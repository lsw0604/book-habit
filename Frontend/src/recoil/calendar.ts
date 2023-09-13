import dayjs from 'dayjs';
import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

const CALENDAR_ATOM_KEY = `CALENDAR_ATOM_KEY_${v1()}`;
const CALENDAR_DETAIL_SELECTOR_KEY = `CALENDAR_DETAIL_SELECTOR_KEY_${v1()}`;

type CalendarAtomType = dayjs.Dayjs | null;

export const calendarAtom = atom<CalendarAtomType>({
  key: CALENDAR_ATOM_KEY,
  default: undefined,
});

export const calendarDetailSelector = selector({
  key: CALENDAR_DETAIL_SELECTOR_KEY,
  get: ({ get }) => {
    const initialDate = get(calendarAtom);

    if (!initialDate) return null;

    const month = initialDate.format('MM');
    const year = initialDate.format('YYYY');
    const startDate = dayjs(`${year}${month}01`);
    const firstDOW = Number(startDate.format('d'));
    const lastDate = Number(startDate.clone().endOf('month').format('DD'));
    const monthName = startDate.format('MMMM');

    return {
      month,
      year,
      startDate,
      firstDOW,
      lastDate,
      monthName,
    };
  },
});

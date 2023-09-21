import dayjs from 'dayjs';

export interface ICalendar {
  startDate: dayjs.Dayjs;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
}

export function getUpdatedCalendar(
  monthYear: ICalendar,
  monthIncrement: number
): dayjs.Dayjs {
  return monthYear.startDate.clone().add(monthIncrement, 'months');
}

export function getCalendarDetail(initialDate: dayjs.Dayjs): ICalendar {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewCalendar(
  prevData: ICalendar,
  monthIncrement: number
): ICalendar {
  const newMonthYear = getUpdatedCalendar(prevData, monthIncrement);

  return getCalendarDetail(newMonthYear);
}

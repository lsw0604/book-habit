import dayjs from 'dayjs';

export interface MonthYear {
  startDate: dayjs.Dayjs;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
}

export function getUpdatedMonthYear(
  monthYear: MonthYear,
  monthIncrement: number
): dayjs.Dayjs {
  return monthYear.startDate.clone().add(monthIncrement, 'months');
}

export function getMonthYearDetails(initialDate: dayjs.Dayjs): MonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewMonthYear(
  prevData: MonthYear,
  monthIncrement: number
): MonthYear {
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement);

  return getMonthYearDetails(newMonthYear);
}

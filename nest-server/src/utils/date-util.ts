import * as dayjs from 'dayjs';

export function calculateDateRange(payload: CalculateDateRangePayload) {
  const { end, start } = payload;
  const today = dayjs();

  let startDate: Date;
  let endDate: Date;

  if (start) {
    startDate = dayjs(start).toDate();
    endDate = end ? dayjs(end).toDate() : dayjs(startDate).endOf('month').toDate();
  } else if (end) {
    startDate = today.startOf('month').toDate();
    endDate = dayjs(end).toDate();
  } else {
    startDate = today.startOf('month').toDate();
    endDate = today.endOf('month').toDate();
  }

  return {
    startDate,
    endDate,
  };
}

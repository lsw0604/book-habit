type DateBoxType = {
  usersBooksId: number;
  gridColumn?: number;
  date?: number;
  year?: string;
  month?: string;
  data: { [date: string]: HistoryStatusType[] };
  startDate?: string;
  endDate?: string;
};

type CalendarDateByDataType = {
  [date: string]: HistoryStatusType[];
};

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

type CalendarHeaderType = {
  myBookHistoryData: MyBookPageQueriesHistoryListType;
  myBookTimeData: MyBookPageQueriesTimeRangeResponseType;
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
  options: string[];
};

type CalendarHeaderButtonsType = {
  children: ReactNode;
} & Pick<CalendarHeaderType, 'myBookHistoryData' | 'myBookTimeData'>;

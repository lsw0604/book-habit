import Selector from 'components/common/Selector';
import CalendarHeaderButtons from 'components/calendar/CalendarHeaderButtons';

export default function CalendarHeader({
  myBookHistoryData,
  myBookTimeData,
  filter,
  setFilter,
  options,
}: CalendarHeaderType) {
  return (
    <CalendarHeaderButtons
      myBookHistoryData={myBookHistoryData}
      myBookTimeData={myBookTimeData}
    >
      <Selector
        multiple
        value={filter}
        onChange={(e) => setFilter(e)}
        options={options}
      />
    </CalendarHeaderButtons>
  );
}

import { Fragment, useContext } from 'react';
import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import SelectedDate from '@/features/polls/components/selected-date.tsx';
import { isObjectEmpty } from '@/utils/objects.ts';
import { SelectedOptionsContext, SelectedOptionsContextType } from '@/features/polls/context/selected-options-context.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';

const CalendarSection = () => {
  const { selectedOptions, addNewDay } = useContext(SelectedOptionsContext) as SelectedOptionsContextType;

  const onSelectDay = (dates: Date[] | undefined) => {
    if (!dates) return;

    dates.map((date) => {
      console.log('onSelectDay', date);
      addNewDay(date);
    });
  };

  const renderDayPicker = () => {
    const selectedDays = !selectedOptions || isObjectEmpty(selectedOptions)
      ? []
      : Object.keys(selectedOptions).map((val) => new Date(val));

    return (
      <DayPicker selected={selectedDays} onSelect={onSelectDay} />
    );
  };

  const renderSelectedDates = () => {
    if (!selectedOptions || isObjectEmpty(selectedOptions))
      return null;

    return (
      Object.keys(selectedOptions).map((dateString, index) => (
        <Fragment key={dateString}>
        <SelectedDate key={dateString} dateString={dateString} />
          {index !== (Object.keys(selectedOptions).length - 1) && <DividerLine color={"bg-gray-100"} />}
        </Fragment>
      )));
  };

  return (
    <div className={'flex max-md:flex-wrap'}>
      {renderDayPicker()}

      <div
        className={'w-full flex flex-col gap-y-6 max-md:mt-6 md:border-l-2 md:border-gray-200 md:ml-4 md:pl-6 md:flex-1'}>
        {renderSelectedDates()}
      </div>
    </div>
  );
};

export default CalendarSection;
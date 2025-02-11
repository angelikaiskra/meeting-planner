import { Fragment, useContext } from 'react';
import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import SelectedDate from '@/features/polls/components/selected-date.tsx';
import { isObjectEmpty } from '@/utils/objects.ts';
import { SelectedOptionsContext, SelectedOptionsContextType } from '@/features/polls/context/selected-options-context.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import { Calendar } from '@phosphor-icons/react';

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

  const renderNoDaysPlaceholder = () => {
    return (
      <div className={"flex flex-col gap-4 justify-center items-center text-gray-300 text-center m-auto md:py-6 px-10 max-w-77"}>
        <Calendar size={48} />
        <span>Click on a date in the calendar to get started</span>
      </div>
    )
  }

  const renderSelectedDates = () => {
    if (!selectedOptions || isObjectEmpty(selectedOptions))
      return renderNoDaysPlaceholder();

    return (
      Object.keys(selectedOptions).map((dateString, index) => (
        <Fragment key={dateString}>
        <SelectedDate key={dateString} dateString={dateString} />
          {index !== (Object.keys(selectedOptions).length - 1) && <DividerLine color={"bg-gray-100"} />}
        </Fragment>
      )));
  };

  return (
    <div className={'flex max-md:flex-wrap max-md:pb-8 max-md:border-b-2 max-md:border-gray-200'}>
      {renderDayPicker()}

      <div
        className={'w-full flex flex-col gap-y-6 max-md:mt-6 md:border-l-2 md:border-gray-200 md:ml-4 md:pl-6 md:flex-1'}>
        {renderSelectedDates()}
      </div>
    </div>
  );
};

export default CalendarSection;
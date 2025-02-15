import React, { useMemo } from 'react';
import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import { GroupedTimeOptions, TimeOption, TimeValue } from '@/types/time.ts';
import NoDaysPlaceholder from './no-days-placeholder';
import SelectedDate from './selected-date';
import moment from 'moment';

interface CalendarSectionProps {
  options: TimeOption[];
  setOptions: (value: TimeOption[]) => void;
  errorMessage?: string;
}

const CalendarSection = React.forwardRef<HTMLDivElement, CalendarSectionProps>(({ options, setOptions, errorMessage }, ref) => {

  const onSelectDay = (dates: Date[] | undefined) => {
    if (!dates) return;

    dates.map((date) => {
      const newOptions = [...options];
      newOptions.push({
        startTime: moment(date).set({ hours: 12, minutes: 0 }).toDate(),
        endTime: moment(date).set({ hours: 13, minutes: 0 }).toDate()
      });

      // sort the options by start time
      newOptions.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

      setOptions(newOptions);
    });
  };

  const onAddTimeClick = (e: React.MouseEvent<HTMLButtonElement>, date: Date, lastDateOption: TimeOption) => {
    e.preventDefault();

    const newOptions = [...options];

    if (lastDateOption) {
      newOptions.push({
        startTime: moment(lastDateOption.endTime).toDate(),
        endTime: moment(lastDateOption.endTime).add(1, 'hour').toDate()
      });
    } else {
      newOptions.push({
        startTime: moment(date).set({ hours: 12, minutes: 0 }).toDate(),
        endTime: moment(date).set({ hours: 13, minutes: 0 }).toDate()
      });
    }

    setOptions(newOptions);
  };

  const onRemoveTimeClick = (e: React.MouseEvent<HTMLButtonElement>, dateOption: TimeOption) => {
    e.preventDefault();

    const newOptions = options.filter((option) => (
      option.startTime !== dateOption.startTime && option.endTime !== dateOption.endTime
    ));

    setOptions(newOptions);
  };

  const updateOption = (oldDate: Date, propertyName: keyof TimeOption, newTime?: TimeValue) => {
    if (!newTime) return;

    const newOptions = [...options];

    newOptions.map((option) => {
      const property = option[propertyName];

      if (property === oldDate) {
        option[propertyName] = moment(property).set({
          hours: newTime.hours,
          minutes: newTime.minutes
        }).toDate();
      }
    });

    setOptions(newOptions);
  };

  const groupByDate = (options: TimeOption[]): GroupedTimeOptions => {
    const groupedOptions: GroupedTimeOptions = {};

    options.forEach((option) => {
      const dateKey = moment(option.startTime).format('YYYY-MM-DD');
      if (!groupedOptions[dateKey]) {
        groupedOptions[dateKey] = [];
      }
      groupedOptions[dateKey].push(option);
    });

    return groupedOptions;
  };

  const groupedOptions = useMemo(() => groupByDate(options), [options]);

  return (
    <>
      <div className={'flex max-md:flex-wrap max-md:pb-8 max-md:border-b-2 max-md:border-gray-200'} ref={ref}>
        <DayPicker selected={options.map((opt) => opt.startTime)} onSelect={onSelectDay} />

        <div className="w-full flex flex-col gap-y-6 max-md:mt-6 md:border-l-2 md:border-gray-200 md:ml-4 md:pl-6 md:flex-1">
          {options.length === 0 ? (
            <NoDaysPlaceholder />
          ) : (
            Object.keys(groupedOptions).map((dateKey, index) => (
              <React.Fragment key={dateKey}>
                <SelectedDate
                  dateKey={dateKey}
                  dateOptions={groupedOptions[dateKey]}
                  onAddTimeClick={onAddTimeClick}
                  onRemoveTimeClick={onRemoveTimeClick}
                  updateOption={updateOption}
                  options={options}
                />
                {index !== Object.keys(groupedOptions).length - 1 && <DividerLine color="bg-gray-100" />}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </>
  );
});

export default CalendarSection;
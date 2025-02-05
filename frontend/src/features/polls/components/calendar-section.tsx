import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import DateOptions from '@/features/polls/components/date-options.tsx';
import { useState } from 'react';
import { dateToLocale } from '@/utils/time.ts';

const CalendarSection = () => {
  const [selectedOptions, setSelectedOptions] = useState<GroupedTimeOptions>({});

  const selectedDays = Object.keys(selectedOptions).map((val) => new Date(val));

  const onSelectDay = (dates: Date[]) => {
    let newSelectedOptions = [];

    dates.map((date) => {
      console.log("date", date)
      const localeDateString = dateToLocale(date);
      console.log("isoDateString", localeDateString);
      console.log("newSelectedOptions", newSelectedOptions);

      if (!newSelectedOptions[localeDateString]) {
        newSelectedOptions[localeDateString] = [{
          startTime: new Date(date.setHours(12, 0)),
          endTime: new Date(date.setHours(13, 0)),
        }];
      }
    })

    // Sorting Logic: Convert to array, sort by startTime, then convert back to object
    const sortedOptions = Object.entries(newSelectedOptions)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as GroupedTimeOptions);

    setSelectedOptions(sortedOptions);
  }

  return (
    <div className={"flex max-md:flex-wrap"}>
      <DayPicker selected={selectedDays} onSelect={onSelectDay} />

      <div className={"w-full flex flex-col gap-y-6 max-md:mt-6 md:border-l-2 md:border-gray-200 md:ml-4 md:pl-6 md:flex-1"}>
        {Object.keys(selectedOptions).map((key) => {
          const timeOptions = selectedOptions[key];
            return (
              <DateOptions timeOptions={timeOptions} key={key} />
            )
          })
        }
      </div>
    </div>
  );
};

export default CalendarSection;
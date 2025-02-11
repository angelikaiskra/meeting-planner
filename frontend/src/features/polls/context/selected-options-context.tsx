import { createContext, PropsWithChildren, useState } from 'react';
import { dateToLocale } from '@/utils/time.ts';
import { GroupedTimeOptions, TimeOption, TimeValue } from '@/types/time.ts';

export interface SelectedOptionsContextType {
  selectedOptions: GroupedTimeOptions;
  addNewDay: (date: Date) => void;
  removeDay: (dateString: string) => void;
  sort: () => void;
  updateTime: (dateString: string, index: number, propertyName: keyof TimeOption, newTime: TimeValue) => void;
  addNewTimeOption: (dateString: string) => void;
  removeTimeOption: (dateString: string, index: number) => void;
}

export const SelectedOptionsContext = createContext<SelectedOptionsContextType | {}>({});

const SelectedOptionsProvider = ({ children }: PropsWithChildren) => {
  const [selectedOptions, setSelectedOptions] = useState<GroupedTimeOptions>({});

  const addNewDay = (date: Date) => {
    const newSelectedOptions = { ...selectedOptions };
    const dateString = dateToLocale(date); // convert date to format YYYY-MM-DD

    if (!newSelectedOptions[dateString]) {
      newSelectedOptions[dateString] = [{
        startTime: { hours: 12, minutes: 0 },
        endTime: { hours: 13, minutes: 0 }
      }];
    }

    console.log('newSelectedOptions', newSelectedOptions);
    const sortedOptions = sort(newSelectedOptions);
    setSelectedOptions(sortedOptions);
  };

  const removeDay = (dateString: string) => {
    const newSelectedOptions = { ...selectedOptions };

    if (newSelectedOptions[dateString]) {
      delete newSelectedOptions[dateString];
      setSelectedOptions(newSelectedOptions);
    }
  }

  const updateTime = (dateString: string, index: number, propertyName: keyof TimeOption, newTime: TimeValue) => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[dateString][index][propertyName] = newTime;

    if (propertyName === "startTime") {
      const newEndTime = {...newSelectedOptions[dateString][index].endTime};

      if (newEndTime.hours < 23) {
        newEndTime.hours += 1;
      }
    }

    setSelectedOptions(newSelectedOptions);
  }

  const addNewTimeOption = (dateString: string) => {
    const newSelectedOptions = { ...selectedOptions };
    const lastIndex = newSelectedOptions[dateString].length - 1;
    const lastTimeOptions = lastIndex >= 0 ? newSelectedOptions[dateString][lastIndex] : null;
    const newStartTime = lastTimeOptions ? {
      hours: lastTimeOptions.startTime.hours < 23 ? (lastTimeOptions.startTime.hours + 1) : lastTimeOptions.startTime.hours,
      minutes: lastTimeOptions.startTime.minutes
    } : {
      hours: 12,
      minutes: 0
    };
    const newTimeOptions = {
      startTime: newStartTime,
      endTime: {hours: newStartTime.hours + 1, minutes: newStartTime.minutes},
    }

    newSelectedOptions[dateString].push(newTimeOptions);
    setSelectedOptions(newSelectedOptions);
  }

  const removeTimeOption = (dateString: string, index: number) => {
    let newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[dateString].splice(index, 1);
    setSelectedOptions(newSelectedOptions);

    if (newSelectedOptions[dateString].length === 0) {
      removeDay(dateString);
    }
  }

  // Sorting Logic: Convert to array, sort by startTime, then convert back to object
  const sort = (selectedOptionsToSort = selectedOptions) => {
    return Object.entries({ ...selectedOptionsToSort })
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as GroupedTimeOptions);
  };

  const value = { selectedOptions, addNewDay, updateTime, addNewTimeOption, removeTimeOption, removeDay };
  return <SelectedOptionsContext.Provider value={value}>
    {children}
  </SelectedOptionsContext.Provider>;
};

export default SelectedOptionsProvider;

import React from 'react';
import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import moment from 'moment';
import { TimeOption } from '@/types/time.ts';

interface DaySelectionProps {
  options: TimeOption[];
  setOptions: (value: TimeOption[]) => void;
}

const DaySelection: React.FC<DaySelectionProps> = ({ options, setOptions }) => {
  const onSelectDay = (dates: Date[] | undefined) => {
    if (!dates) return;

    const newOptions = [...options];

    dates.map((date) => {
      newOptions.push({
        startTime: moment(date).set({ hours: 12, minutes: 0 }).toDate(),
        endTime: moment(date).set({ hours: 13, minutes: 0 }).toDate()
      });
    });

    setOptions(newOptions);
  };

  const selectedDays = options.map((option) => new Date(option.startTime));

  return (
    <DayPicker selected={selectedDays} onSelect={onSelectDay} />
  );
};

export default DaySelection;

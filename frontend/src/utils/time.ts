import { SelectOption } from '@/types/forms.ts';
import { TimeValue } from '@/types/time.ts';
import moment from 'moment';

export const dateToLocale = (date = new Date()) => {
  return moment(date).format("YYYY-MM-DD");
}

export const generateTimeValues = (incrementValue: number = 30): SelectOption<TimeValue>[] => {
  const options: SelectOption<TimeValue>[] = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += incrementValue) {
      const time = formatHoursAndMinutes(hours, minutes);
      options.push({ label: time, value: {hours: hours, minutes: minutes}, });
    }
  }
  return options;
}

export const formatHoursAndMinutes = (hours: number, minutes: number) => {
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}
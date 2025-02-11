import React, { Fragment } from 'react';
import DayPicker from '@/components/ui/calendar/day-picker.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import { Calendar, DotsThree, Plus, X } from '@phosphor-icons/react';
import { GroupedTimeOptions, TimeOption, TimeValue } from '@/types/time.ts';
import moment from 'moment';
import CalendarDay from '@/components/ui/calendar/calendar-day.tsx';
import IconButton from '@/components/ui/button/icon-button.tsx';
import TimePicker from '@/components/ui/calendar/time-picker.tsx';
import { formatHoursAndMinutes } from '@/utils/time.ts';

interface CalendarSectionProps {
  options: TimeOption[];
  setOptions: (value: TimeOption[]) => void;
}

const CalendarSection = React.forwardRef<HTMLDivElement, CalendarSectionProps>(({ options, setOptions }, ref) => {
  const onSelectDay = (dates: Date[] | undefined) => {
    if (!dates) return;

    dates.map((date) => {
      let newOptions = [...options];
      newOptions.push({
        startTime: moment(date).set({ hours: 12, minutes: 0 }).toDate(),
        endTime: moment(date).set({ hours: 13, minutes: 0 }).toDate()
      });
      setOptions(newOptions);
    });
  };

  const onAddTimeClick = (e: React.MouseEvent<HTMLButtonElement>, date: Date, lastDateOption: TimeOption) => {
    e.preventDefault();

    let newOptions = [...options];

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

  const renderDayPicker = () => {
    const selectedDays = options.map((option) => new Date(option.startTime));

    return (
      <DayPicker selected={selectedDays} onSelect={onSelectDay} />
    );
  };

  const getTimePickerOption = (date: Date) => {
    const hours = moment(date).hours();
    const minutes = moment(date).minutes();

    return ({
        label: formatHoursAndMinutes(hours, minutes),
        value: { hours, minutes }
      }
    );
  };

  const renderTimesPicker = (timeOption: TimeOption) => {
    const startTimePickerVal = getTimePickerOption(timeOption.startTime);
    const endTimePickerVal = getTimePickerOption(timeOption.endTime);

    return (
      <div
        className={'border border-gray-200 h-14 rounded-md flex items-center justify-between p-1 w-full max-lg:max-w-77'}>
        <TimePicker selectedOption={startTimePickerVal}
                    onChange={(newTime) => updateOption(timeOption.startTime, 'startTime', newTime?.value)}
        />

        <span className={'block w-2 h-px bg-font-black'}></span>

        <TimePicker selectedOption={endTimePickerVal}
                    onChange={(newTime) => updateOption(timeOption.endTime, 'endTime', newTime?.value)}
        />
      </div>
    );
  };

  const renderTimeSlot = (dateOption: TimeOption) => {
    return (
      <div key={dateOption.startTime.toISOString()} className={'flex'}>
        {renderTimesPicker(dateOption)}

        <div className={'h-14 flex items-center'}>
          <IconButton icon={X} weight={'bold'} fill={'#717171'} btnClassName={'translate-x-1.5'}
                      onClick={(e) => onRemoveTimeClick(e, dateOption)} />
        </div>
      </div>
    );
  };

  const renderSelectedDate = (dateKey: string, dateOptions: TimeOption[]) => {
    const date = moment(dateKey).toDate();
    const monthName = moment(date).format('MMM');
    const dayNumber = moment(date).format('D');
    const lastDateOption = dateOptions[dateOptions.length - 1];

    return (
      <div className={'max-md:w-full flex max-md:justify-center'}>
        <CalendarDay monthName={monthName} dayNumber={dayNumber} />

        <div className={'md:flex-1 flex flex-col gap-y-3 ml-3'}>
          {dateOptions.map((dateOption) => (
            renderTimeSlot(dateOption)
          ))}

          <div className={'flex gap-x-2'}>
            <div className={'border border-gray-200 rounded-md h-fit'}>
              <IconButton icon={Plus} weight={'bold'} fill={'#0D1216'} btnClassName={'px-3 py-2'}
                          onClick={(e) => onAddTimeClick(e, date, lastDateOption)}
                          disabled={options.length >= 10}>
                Add times
              </IconButton>
            </div>

            <IconButton icon={DotsThree} size={24} weight={'bold'} fill={'#717171'} btnClassName={'p-2'}
                        onClick={() => console.log('onShowTimeMenu')} />
          </div>
        </div>
      </div>
    );
  };

  const renderNoDaysPlaceholder = () => {
    return (
      <div
        className={'flex flex-col gap-4 justify-center items-center text-gray-300 text-center m-auto md:py-6 px-10 max-w-77'}>
        <Calendar size={48} />
        <span>Click on a date in the calendar to get started</span>
      </div>
    );
  };

  const renderSelectedDates = () => {
    if (!options || options.length === 0)
      return renderNoDaysPlaceholder();

    let groupedOptions: GroupedTimeOptions = {};
    options.forEach((option) => {
      const dateKey = moment(option.startTime).format('YYYY-MM-DD');
      if (!groupedOptions[dateKey]) {
        groupedOptions[dateKey] = [];
      }
      groupedOptions[dateKey].push(option);
    });

    return (
      Object.keys(groupedOptions).map((dateKey, index) => {
        const dateOptions = groupedOptions[dateKey];

        return (
          <Fragment key={dateKey}>
            {renderSelectedDate(dateKey, dateOptions)}
            {index !== (options.length - 1) && <DividerLine color={'bg-gray-100'} />}
          </Fragment>
        );
      }));
  };

  return (
    <div className={'flex max-md:flex-wrap max-md:pb-8 max-md:border-b-2 max-md:border-gray-200'} ref={ref}>
      {renderDayPicker()}

      <div
        className={'w-full flex flex-col gap-y-6 max-md:mt-6 md:border-l-2 md:border-gray-200 md:ml-4 md:pl-6 md:flex-1'}>
        {renderSelectedDates()}
      </div>
    </div>
  );
});

export default CalendarSection;
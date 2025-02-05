import CalendarDay from '@/components/ui/calendar/calendar-day.tsx';
import TimesPicker from '@/components/ui/calendar/times-picker.tsx';
import { X, Plus, DotsThree } from '@phosphor-icons/react';
import IconButton from '@/components/ui/button/icon-button.tsx';

const DateOptions = ({ timeOptions }) => {
  console.log("timeOptions", timeOptions)
  const monthName = timeOptions[0].startTime.toLocaleString('en-US', { month: 'short' });
  const dayNumber = timeOptions[0].startTime.getDate();

  return (
    <div className={"max-md:w-full flex max-md:justify-center"}>
      <CalendarDay monthName={monthName} dayNumber={dayNumber} />

      <div className={"md:flex-1 flex flex-col gap-y-3 ml-3"}>
        {timeOptions.map(() => (
              <TimesPicker timeOptions={timeOptions} />
          ))
        }

        <div className={"flex gap-x-2"}>
          <div className={"border border-gray-200 rounded-md h-fit"}>
            <IconButton icon={Plus} weight={"bold"} fill={"#0D1216"} btnClassName={"px-3 py-2"}>Add times</IconButton>
          </div>

          <IconButton icon={DotsThree} size={24} weight={"bold"} fill={"#717171"} btnClassName={"p-2"} />
        </div>
      </div>

      <div className={"h-14 flex items-center"}>
      <IconButton icon={X} weight={"bold"} fill={"#717171"} btnClassName={"translate-x-1.5"} />
      </div>
    </div>
  );
};

export default DateOptions;
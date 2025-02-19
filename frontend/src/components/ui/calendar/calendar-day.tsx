import classNames from "classnames";

interface CalendarDayProps {
  monthName: string;
  dayNumber: string;
  className?: string;
  monthColorClassName?: string;
}

const CalendarDay = ({ monthName, dayNumber, className = "", monthColorClassName = "bg-red" }: CalendarDayProps) => {
  return (
    <div className={`w-12 h-14 text-center rounded-md ${className}`}>
      <div className={classNames(monthColorClassName, "rounded-t-md text-sm p-0.5 text-white")}>
        {monthName}
      </div>
      <div className={"font-bold text-xl p-px border border-t-0 border-gray-200 rounded-b-md"}>
        {dayNumber}
      </div>
    </div>
  );
};

export default CalendarDay;
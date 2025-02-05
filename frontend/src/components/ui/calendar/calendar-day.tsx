interface CalendarDayProps {
  monthName: string;
  dayNumber: number;
  className?: string;
}

const CalendarDay = ({monthName, dayNumber, className = ""}: CalendarDayProps) => {
  return (
    <div className={`w-12 h-14 text-center rounded-md ${className}`}>
      <div className={"bg-red rounded-t-md text-sm p-0.5 text-white"}>
        {monthName}
      </div>
      <div className={"font-bold text-xl p-px border border-t-0 border-gray-200 rounded-b-md"}>
        {dayNumber}
      </div>
    </div>
  );
};

export default CalendarDay;
import { ClassNames, DayPicker as ReactDayPicker, getDefaultClassNames, OnSelectHandler } from 'react-day-picker';
import "react-day-picker/style.css";
import "./day-picker.css";

interface DayPickerProps {
  className?: Partial<ClassNames>;
  selected?: Date[] | undefined;
  onSelect?: OnSelectHandler<Date[] | undefined>;
}

const DayPicker = ({className = {}, selected, setSelected, ...props}: DayPickerProps) => {
  const defaultClassNames = getDefaultClassNames();

  const outlineClasses = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const calendarClasses = {
    root: `${defaultClassNames.root} flex justify-center max-md:w-full`,
    months: `${defaultClassNames.months} block text-sm`,
    month_caption: `flex justify-center h-12 font-regular text-base`,
    nav: `absolute top-0 left-0 w-full flex justify-between items-center h-12`,
    button_previous: `${defaultClassNames.button_previous} ${outlineClasses} left-8 !h-9 rounded-full hover:!bg-gray-100`,
    button_next: `${defaultClassNames.button_previous} ${outlineClasses} right-8 !h-9 rounded-full hover:!bg-gray-100`,
    chevron: `${defaultClassNames.chevron} fill-accent`,
    selected: `${defaultClassNames.selected} !font-normal [&>button]:!bg-accent [&>button]:!border-0 [&>button]:!text-white [&>button]:!text-sm`,
    today: `${defaultClassNames.today} font-bold`,
    day: `${defaultClassNames.day} hover:[&>button]:!bg-gray-100 [.rdp-selected]:hover:[&>button]:!bg-accent [&>button]:focus-visible:outline-none [&>button]:focus-visible:ring-2 [&>button]:focus:ring-ring`,
    ...className
  };

  return (
      <ReactDayPicker
        mode={"multiple"}
        showOutsideDays={true}
        selected={selected}
        onSelect={setSelected}
        classNames={calendarClasses}
        {...props}
      />
  );
};

export default DayPicker;
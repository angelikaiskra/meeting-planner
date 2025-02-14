import IconButton from "@/components/ui/button/icon-button";
import { TimeOption, TimeValue } from "@/types/time";
import { Plus, DotsThree } from "@phosphor-icons/react";
import moment from "moment";
import CalendarDay from "@/components/ui/calendar/calendar-day";
import TimeSlot from "./time-slot";

interface SelectedDateProps {
    dateKey: string;
    dateOptions: TimeOption[];
    onAddTimeClick: (e: React.MouseEvent<HTMLButtonElement>, date: Date, lastDateOption: TimeOption) => void;
    onRemoveTimeClick: (e: React.MouseEvent<HTMLButtonElement>, option: TimeOption) => void;
    updateOption: (oldDate: Date, propertyName: keyof TimeOption, newTime?: TimeValue) => void;
    options: TimeOption[];
}

const SelectedDate = ({ dateKey, dateOptions, onAddTimeClick, onRemoveTimeClick, updateOption, options }: SelectedDateProps) => {
    const date = moment(dateKey).toDate();
    const monthName = moment(date).format('MMM');
    const dayNumber = moment(date).format('D');
    const lastDateOption = dateOptions[dateOptions.length - 1];

    return (
        <div className={'max-md:w-full flex max-md:justify-center'}>
            <CalendarDay monthName={monthName} dayNumber={dayNumber} />

            <div className={'md:flex-1 flex flex-col gap-y-3 ml-3'}>
                {dateOptions.map((dateOption) => (
                    <TimeSlot
                        key={dateOption.startTime.toISOString()}
                        dateOption={dateOption}
                        onRemoveTimeClick={onRemoveTimeClick}
                        updateOption={updateOption} />
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
}

export default SelectedDate;
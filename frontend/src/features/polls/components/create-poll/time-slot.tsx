import React from 'react';
import TimePicker from '@/components/ui/calendar/time-picker.tsx';
import IconButton from '@/components/ui/button/icon-button.tsx';
import { X } from '@phosphor-icons/react';
import { TimeOption, TimeValue } from '@/types/time.ts';
import moment from 'moment';
import classNames from "classnames";

interface TimeSlotProps {
    dateOption: TimeOption;
    onRemoveTimeClick: (e: React.MouseEvent<HTMLButtonElement>, option: TimeOption) => void;
    updateOption: (oldDate: Date, propertyName: keyof TimeOption, newTime?: TimeValue) => void;
    className?: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ dateOption, onRemoveTimeClick, updateOption, className }) => {
    const getTimePickerOption = (date: Date) => ({
        label: moment(date).format('HH:mm'),
        value: { hours: moment(date).hours(), minutes: moment(date).minutes() }
    });

    const startTimePickerVal = getTimePickerOption(dateOption.startTime);
    const endTimePickerVal = getTimePickerOption(dateOption.endTime);

    return (
        <div className="flex">
            <div className={classNames(
                "border border-gray-200 h-14 rounded-md flex items-center justify-between p-1 w-full max-lg:max-w-77",
                className
            )}>
                <TimePicker
                    selectedOption={startTimePickerVal}
                    onChange={(newTime) => updateOption(dateOption.startTime, 'startTime', newTime?.value)}
                />

                <span className="block w-2 h-px bg-font-black"></span>

                <TimePicker
                    selectedOption={endTimePickerVal}
                    onChange={(newTime) => updateOption(dateOption.endTime, 'endTime', newTime?.value)}
                />
            </div>

            <div className="h-14 flex items-center">
                <IconButton
                    icon={X}
                    weight="bold"
                    fill="#717171"
                    btnClassName="translate-x-1.5"
                    onClick={(e) => onRemoveTimeClick(e, dateOption)}
                />
            </div>
        </div>
    );
};

export default TimeSlot;